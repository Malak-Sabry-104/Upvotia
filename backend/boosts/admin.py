from django.contrib import admin
from .models import Boost


@admin.register(Boost)
class BoostAdmin(admin.ModelAdmin):
    list_display = ('user', 'amount', 'target_title', 'created_at')
    list_filter = ('created_at', 'content_type')
    search_fields = ('user__username', 'message')
    readonly_fields = ('created_at', 'target_title')