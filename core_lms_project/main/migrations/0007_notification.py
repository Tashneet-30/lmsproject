# Generated by Django 5.0.6 on 2024-07-18 11:13

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0006_studentassignment"),
    ]

    operations = [
        migrations.CreateModel(
            name="Notification",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("message", models.CharField(max_length=100)),
            ],
        ),
    ]
