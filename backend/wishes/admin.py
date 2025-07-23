from django.contrib import admin
from .models import Wish, Upvote

@admin.register(Wish)
class WishAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'user', 'upvotes_count', 'created_at')
    search_fields = ('title', 'description', 'user__username')
    readonly_fields = ('created_at',)


@admin.register(Upvote)
class UpvoteAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'content_object', 'created_at')
    search_fields = ('user__username',)
    readonly_fields = ('created_at',)