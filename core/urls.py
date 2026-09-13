from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('assets/', views.asset_list, name='assets'),
    path('requests/', views.request_list, name='requests'),
    path('requests/<int:pk>/', views.request_detail, name='request_detail'),
    path('work-orders/', views.work_order_list, name='work_orders'),
    path('spare-parts/', views.spare_part_list, name='spare_parts'),
]
