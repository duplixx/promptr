from typing import List, Optional, Dict
from datetime import datetime
from schemas.user import SkillProgress, UserProgress

class ProgressService:
    def __init__(self):
        # Define skill categories and their base XP requirements
        self.skill_categories = {
            'clarity': {
                'base_xp': 100,
                'max_level': 5,
                'skills': [
                    'clarity-basics',
                    'advanced-clarity',
                    'clarity-mastery'
                ]
            },
            'specificity': {
                'base_xp': 100,
                'max_level': 5,
                'skills': [
                    'specificity-intro',
                    'advanced-specificity',
                    'specificity-mastery'
                ]
            },
            'context': {
                'base_xp': 100,
                'max_level': 5,
                'skills': [
                    'context-awareness',
                    'advanced-context',
                    'context-mastery'
                ]
            },
            'persona': {
                'base_xp': 100,
                'max_level': 5,
                'skills': [
                    'persona-mastery',
                    'advanced-persona',
                    'persona-expert'
                ]
            }
        }

    def create_default_progress(self, user_id: str) -> UserProgress:
        """Create default progress for new users"""
        skills = []
        
        # Initialize basic skills as unlocked
        for category, config in self.skill_categories.items():
            for skill_id in config['skills']:
                skills.append(SkillProgress(
                    skill_id=skill_id,
                    category=category,
                    level=0,
                    max_level=config['max_level'],
                    xp_earned=0,
                    unlocked=skill_id in ['clarity-basics', 'specificity-intro', 'context-awareness']
                ))
        
        return UserProgress(
            user_id=user_id,
            total_xp=0,
            skills=skills,
            achievements=[],
            last_updated=datetime.utcnow()
        )

    def add_xp_to_skill(
        self, 
        progress: UserProgress, 
        skill_id: str, 
        xp_amount: int
    ) -> UserProgress:
        """Add XP to a specific skill"""
        updated_skills = []
        total_xp_gained = 0
        
        for skill in progress.skills:
            if skill.skill_id == skill_id:
                new_xp = skill.xp_earned + xp_amount
                new_level = self._calculate_level(skill.category, new_xp)
                
                # Check if skill leveled up
                leveled_up = new_level > skill.level
                
                updated_skill = SkillProgress(
                    skill_id=skill.skill_id,
                    category=skill.category,
                    level=new_level,
                    max_level=skill.max_level,
                    xp_earned=new_xp,
                    unlocked=skill.unlocked or leveled_up
                )
                
                total_xp_gained += xp_amount
                updated_skills.append(updated_skill)
            else:
                updated_skills.append(skill)
        
        # Update total XP
        new_total_xp = progress.total_xp + total_xp_gained
        
        # Check for achievements
        new_achievements = self._check_achievements(progress.achievements, new_total_xp, updated_skills)
        
        return UserProgress(
            user_id=progress.user_id,
            total_xp=new_total_xp,
            skills=updated_skills,
            achievements=new_achievements,
            last_updated=datetime.utcnow()
        )

    def _calculate_level(self, category: str, xp: int) -> int:
        """Calculate skill level based on XP"""
        base_xp = self.skill_categories[category]['base_xp']
        max_level = self.skill_categories[category]['max_level']
        
        # Simple linear progression: each level requires base_xp * level XP
        level = 0
        for i in range(1, max_level + 1):
            if xp >= base_xp * i:
                level = i
            else:
                break
                
        return min(level, max_level)

    def _check_achievements(
        self, 
        current_achievements: List[str], 
        total_xp: int, 
        skills: List[SkillProgress]
    ) -> List[str]:
        """Check for new achievements"""
        new_achievements = current_achievements.copy()
        
        # XP-based achievements
        if total_xp >= 1000 and 'first_thousand' not in new_achievements:
            new_achievements.append('first_thousand')
        
        if total_xp >= 5000 and 'xp_master' not in new_achievements:
            new_achievements.append('xp_master')
        
        # Skill-based achievements
        maxed_skills = sum(1 for skill in skills if skill.level >= skill.max_level)
        if maxed_skills >= 2 and 'skill_master' not in new_achievements:
            new_achievements.append('skill_master')
        
        # Category completion achievements
        for category in self.skill_categories.keys():
            category_skills = [s for s in skills if s.category == category]
            if all(s.level >= s.max_level for s in category_skills):
                achievement_name = f'{category}_master'
                if achievement_name not in new_achievements:
                    new_achievements.append(achievement_name)
        
        return new_achievements

    def get_skill_progress(self, progress: UserProgress, category: str) -> Dict:
        """Get progress for a specific skill category"""
        category_skills = [s for s in progress.skills if s.category == category]
        
        if not category_skills:
            return {
                'total_xp': 0,
                'max_xp': 0,
                'level': 0,
                'max_level': 0,
                'percentage': 0
            }
        
        total_xp = sum(s.xp_earned for s in category_skills)
        max_xp = sum(s.max_level * self.skill_categories[category]['base_xp'] for s in category_skills)
        current_level = max(s.level for s in category_skills)
        max_level = max(s.max_level for s in category_skills)
        
        return {
            'total_xp': total_xp,
            'max_xp': max_xp,
            'level': current_level,
            'max_level': max_level,
            'percentage': (total_xp / max_xp * 100) if max_xp > 0 else 0
        }

    def get_overall_progress(self, progress: UserProgress) -> Dict:
        """Get overall progress summary"""
        total_xp = progress.total_xp
        total_skills = len(progress.skills)
        unlocked_skills = len([s for s in progress.skills if s.unlocked])
        maxed_skills = len([s for s in progress.skills if s.level >= s.max_level])
        
        return {
            'total_xp': total_xp,
            'total_skills': total_skills,
            'unlocked_skills': unlocked_skills,
            'maxed_skills': maxed_skills,
            'achievements': len(progress.achievements),
            'completion_percentage': (maxed_skills / total_skills * 100) if total_skills > 0 else 0
        }
