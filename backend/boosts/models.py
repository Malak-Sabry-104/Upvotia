from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

User = get_user_model()

class Boost(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='boosts_made')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    message = models.TextField(blank=True, max_length=500)
    
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"${self.amount} boost from {self.user.username}"

    @property
    def target_title(self):
        if hasattr(self.content_object, 'title'):
            return self.content_object.title
        return str(self.content_object)