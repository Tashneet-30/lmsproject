# Generated by Django 5.0.6 on 2024-07-23 14:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0009_quiz_coursequiz_quizquestions"),
    ]

    operations = [
        migrations.AddField(
            model_name="coursequiz",
            name="teacher",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="teacher_quizzes",
                to="main.teacher",
            ),
        ),
    ]
