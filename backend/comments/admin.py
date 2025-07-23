from django.contrib import admin
from .models import Comment

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'content_short', 'content_object', 'parent', 'created_at')
    list_filter = ('created_at', 'content_type')
    search_fields = ('user__username', 'content')
    readonly_fields = ('created_at', 'updated_at')

    def content_short(self, obj):
        return obj.content[:50] + "..." if len(obj.content) > 50 else obj.content
    content_short.short_description = "Content"