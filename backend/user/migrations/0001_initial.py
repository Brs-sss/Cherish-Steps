# Generated by Django 4.2.5 on 2023-10-27 07:01

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=20)),
                ('password', models.CharField(max_length=20)),
                ('openid', models.CharField(blank=True, max_length=100, null=True, unique=True)),
                ('label', models.CharField(blank=True, max_length=20, null=True)),
                ('session_key', models.CharField(max_length=50)),
            ],
        ),
    ]
