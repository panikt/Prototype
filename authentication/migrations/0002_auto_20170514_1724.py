# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-05-14 10:24
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='image',
            field=models.CharField(blank=True, default='http://127.0.0.1:8000/media/gallery/default.png', max_length=255),
        ),
    ]