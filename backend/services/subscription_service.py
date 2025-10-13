from typing import Optional, List
from datetime import datetime, timedelta
from schemas.user import (
    SubscriptionTier, 
    SubscriptionCreate, 
    SubscriptionResponse,
    SubscriptionLimits
)

class SubscriptionService:
    def __init__(self):
        self.default_limits = {
            SubscriptionTier.FREE: SubscriptionLimits(
                daily_analyses=5,
                monthly_analyses=50,
                api_calls=0
            ),
            SubscriptionTier.PRO: SubscriptionLimits(
                daily_analyses=-1,  # Unlimited
                monthly_analyses=-1,  # Unlimited
                api_calls=1000
            ),
            SubscriptionTier.BUSINESS: SubscriptionLimits(
                daily_analyses=-1,  # Unlimited
                monthly_analyses=-1,  # Unlimited
                api_calls=10000
            )
        }
        
        self.default_features = {
            SubscriptionTier.FREE: [
                "basic_analysis",
                "profile_creation",
                "skill_tracking"
            ],
            SubscriptionTier.PRO: [
                "basic_analysis",
                "profile_creation", 
                "skill_tracking",
                "advanced_analysis",
                "unlimited_analyses",
                "priority_support",
                "export_data"
            ],
            SubscriptionTier.BUSINESS: [
                "basic_analysis",
                "profile_creation",
                "skill_tracking", 
                "advanced_analysis",
                "unlimited_analyses",
                "priority_support",
                "export_data",
                "api_access",
                "team_management",
                "custom_integrations",
                "analytics_dashboard"
            ]
        }

    def create_default_subscription(self, user_id: str) -> SubscriptionResponse:
        """Create a default free subscription for new users"""
        return SubscriptionResponse(
            id=f"sub_{user_id}",
            user_id=user_id,
            tier=SubscriptionTier.FREE,
            features=self.default_features[SubscriptionTier.FREE],
            limits=self.default_limits[SubscriptionTier.FREE],
            expires_at=None,
            is_active=True,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

    def upgrade_subscription(
        self, 
        user_id: str, 
        new_tier: SubscriptionTier,
        expires_at: Optional[datetime] = None
    ) -> SubscriptionResponse:
        """Upgrade user subscription to a new tier"""
        if expires_at is None and new_tier != SubscriptionTier.FREE:
            # Default to 1 month for paid subscriptions
            expires_at = datetime.utcnow() + timedelta(days=30)
            
        return SubscriptionResponse(
            id=f"sub_{user_id}",
            user_id=user_id,
            tier=new_tier,
            features=self.default_features[new_tier],
            limits=self.default_limits[new_tier],
            expires_at=expires_at,
            is_active=True,
            created_at=datetime.utcnow(),
            updated_at=datetime.utcnow()
        )

    def check_usage_limits(
        self, 
        subscription: SubscriptionResponse,
        daily_usage: int = 0,
        monthly_usage: int = 0
    ) -> bool:
        """Check if user has exceeded their usage limits"""
        if subscription.tier == SubscriptionTier.FREE:
            if subscription.limits.daily_analyses > 0 and daily_usage >= subscription.limits.daily_analyses:
                return False
            if subscription.limits.monthly_analyses > 0 and monthly_usage >= subscription.limits.monthly_analyses:
                return False
        return True

    def get_remaining_usage(
        self,
        subscription: SubscriptionResponse,
        daily_usage: int = 0,
        monthly_usage: int = 0
    ) -> dict:
        """Get remaining usage for the user"""
        if subscription.tier == SubscriptionTier.FREE:
            return {
                "daily_analyses": max(0, subscription.limits.daily_analyses - daily_usage),
                "monthly_analyses": max(0, subscription.limits.monthly_analyses - monthly_usage),
                "api_calls": subscription.limits.api_calls
            }
        else:
            return {
                "daily_analyses": -1,  # Unlimited
                "monthly_analyses": -1,  # Unlimited
                "api_calls": subscription.limits.api_calls
            }

    def has_feature(self, subscription: SubscriptionResponse, feature: str) -> bool:
        """Check if subscription includes a specific feature"""
        return feature in subscription.features

    def is_subscription_active(self, subscription: SubscriptionResponse) -> bool:
        """Check if subscription is still active"""
        if not subscription.is_active:
            return False
        
        if subscription.expires_at and subscription.expires_at < datetime.utcnow():
            return False
            
        return True
