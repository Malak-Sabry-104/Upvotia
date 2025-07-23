from django.urls import path
from .views import (
    UserRegistrationView, 
    UserProfileView, 
    PublicUserProfileView,
    update_user_profile
)

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='user-register'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('profile/update/', update_user_profile, name='update-profile'),
    path('profile/<int:id>/', PublicUserProfileView.as_view(), name='public-profile'),
]