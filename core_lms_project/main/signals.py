# main/signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from .models import StudentAssignment  # Ensure this import is correct

@receiver(post_save, sender=StudentAssignment)
def assignment_created(sender, instance, created, **kwargs):
    if created:
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.group_send)(
            'notifications',
            {
                'type': 'send_notification',
                'message': f'New assignment added: {instance.title}'
            }
        )