from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import WishViewSet, UpvoteViewSet

router = DefaultRouter()
router.register(r'wishes', WishViewSet, basename='wish')
router.register(r'upvotes', UpvoteViewSet, basename='upvote')

urlpatterns = [
    path('', include(router.urls)),
] 