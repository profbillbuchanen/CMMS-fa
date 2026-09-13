from django.contrib import admin
from jalali_date.admin import ModelAdminJalaliMixin
from .models import Asset, MaintenanceRequest, WorkOrder, SparePart, MaintenanceLog


@admin.register(Asset)
class AssetAdmin(ModelAdminJalaliMixin, admin.ModelAdmin):
    list_display = ('name', 'code', 'category', 'status', 'get_jalali_purchase_date', 'created_at')
    list_filter = ('status', 'category')
    search_fields = ('name', 'code', 'description')
    ordering = ('-created_at',)
    fieldsets = (
        ('اطلاعات اصلی', {
            'fields': ('name', 'code', 'category', 'location', 'status')
        }),
        ('اطلاعات خرید و گارانتی', {
            'fields': ('purchase_date', 'warranty_expiry', 'description')
        }),
    )


@admin.register(MaintenanceRequest)
class MaintenanceRequestAdmin(ModelAdminJalaliMixin, admin.ModelAdmin):
    list_display = ('title', 'asset', 'priority', 'status', 'requester', 'get_jalali_created_at')
    list_filter = ('status', 'priority', 'created_at')
    search_fields = ('title', 'description', 'asset__name')
    ordering = ('-created_at',)
    fieldsets = (
        ('اطلاعات درخواست', {
            'fields': ('title', 'asset', 'requester', 'priority', 'status')
        }),
        ('شرح مشکل', {
            'fields': ('description',)
        }),
        ('اختصاص به تکنسین', {
            'fields': ('assigned_to',)
        }),
    )


@admin.register(WorkOrder)
class WorkOrderAdmin(ModelAdminJalaliMixin, admin.ModelAdmin):
    list_display = ('title', 'request', 'technician', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('title', 'request__title')
    ordering = ('-created_at',)
    fieldsets = (
        ('اطلاعات دستور کار', {
            'fields': ('title', 'request', 'technician', 'status')
        }),
        ('زمان‌بندی', {
            'fields': ('start_date', 'end_date', 'estimated_hours', 'actual_hours')
        }),
        ('یادداشت‌ها', {
            'fields': ('notes',)
        }),
    )


@admin.register(SparePart)
class SparePartAdmin(ModelAdminJalaliMixin, admin.ModelAdmin):
    list_display = ('name', 'part_number', 'quantity', 'min_quantity', 'unit', 'is_low_stock_indicator')
    list_filter = ('supplier',)
    search_fields = ('name', 'part_number')
    ordering = ('name',)
    fieldsets = (
        ('اطلاعات قطعه', {
            'fields': ('name', 'part_number', 'unit')
        }),
        ('موجودی', {
            'fields': ('quantity', 'min_quantity', 'location')
        }),
        ('تامین‌کننده و قیمت', {
            'fields': ('supplier', 'price')
        }),
    )
    
    def is_low_stock_indicator(self, obj):
        if obj.is_low_stock():
            return '⚠️ موجودی کم'
        return '✓'
    is_low_stock_indicator.short_description = 'وضعیت موجودی'


@admin.register(MaintenanceLog)
class MaintenanceLogAdmin(ModelAdminJalaliMixin, admin.ModelAdmin):
    list_display = ('work_order', 'technician', 'action', 'hours_worked', 'created_at')
    list_filter = ('created_at', 'technician')
    search_fields = ('action', 'notes')
    ordering = ('-created_at',)
    filter_horizontal = ('parts_used',)
