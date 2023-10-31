from django.urls import path
from . import views

from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('api/login', views.login, name='login'),
    path('api/register', views.register, name='register'),
    path('api/show/event/submit',views.submitEvent,name='submit_event'),
    path('api/getSHA256',views.getSHA256,name='getsha256'),
    path('api/show/event/upload_image',views.addEventImage,name='upload_image'),
    path('api/show/all',views.loadShowPage,name='load_showpage'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)