from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import BoostViewSet, create_boost

router = DefaultRouter()
router.register(r'boosts', BoostViewSet, basename='boost')

urlpatterns = [
    path('', include(router.urls)),
    path('create/', create_boost, name='create-boost'),
]