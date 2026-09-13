from django.db import models
from django.contrib.auth.models import User
from jalali_date import date2jalali
import jdatetime


class Asset(models.Model):
    """مدل دارایی‌ها و تجهیزات"""
    
    STATUS_CHOICES = (
        ('active', 'فعال'),
        ('inactive', 'غیرفعال'),
        ('maintenance', 'در حال تعمیر'),
        ('broken', 'خراب'),
    )
    
    name = models.CharField(max_length=200, verbose_name='نام تجهیز')
    code = models.CharField(max_length=50, unique=True, verbose_name='کد تجهیز')
    category = models.CharField(max_length=100, blank=True, verbose_name='دسته‌بندی')
    location = models.CharField(max_length=200, blank=True, verbose_name='موقعیت')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active', verbose_name='وضعیت')
    purchase_date = models.DateField(null=True, blank=True, verbose_name='تاریخ خرید')
    warranty_expiry = models.DateField(null=True, blank=True, verbose_name='پایان گارانتی')
    description = models.TextField(blank=True, verbose_name='توضیحات')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='تاریخ به‌روزرسانی')
    
    class Meta:
        verbose_name = 'تجهیز'
        verbose_name_plural = 'تجهیزات'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} ({self.code})"
    
    def get_jalali_purchase_date(self):
        if self.purchase_date:
            return date2jalali(self.purchase_date)
        return None
    
    def get_jalali_warranty_expiry(self):
        if self.warranty_expiry:
            return date2jalali(self.warranty_expiry)
        return None


class MaintenanceRequest(models.Model):
    """مدل درخواست‌های تعمیر و نگهداری"""
    
    PRIORITY_CHOICES = (
        ('low', 'کم'),
        ('medium', 'متوسط'),
        ('high', 'زیاد'),
        ('critical', 'بحرانی'),
    )
    
    STATUS_CHOICES = (
        ('pending', 'در انتظار'),
        ('approved', 'تایید شده'),
        ('in_progress', 'در حال انجام'),
        ('completed', 'انجام شده'),
        ('cancelled', 'لغو شده'),
    )
    
    title = models.CharField(max_length=200, verbose_name='عنوان درخواست')
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE, related_name='requests', verbose_name='تجهیز')
    requester = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='requests', verbose_name='درخواست‌دهنده')
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='medium', verbose_name='اولویت')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending', verbose_name='وضعیت')
    description = models.TextField(verbose_name='شرح مشکل')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_requests', verbose_name='مسئول اجرا')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ثبت')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='تاریخ به‌روزرسانی')
    completed_at = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ تکمیل')
    
    class Meta:
        verbose_name = 'درخواست تعمیر'
        verbose_name_plural = 'درخواست‌های تعمیر'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.asset.name}"
    
    def get_jalali_created_at(self):
        return date2jalali(self.created_at.date()) if self.created_at else None


class WorkOrder(models.Model):
    """مدل دستور کار"""
    
    STATUS_CHOICES = (
        ('open', 'باز'),
        ('in_progress', 'در حال انجام'),
        ('on_hold', 'متوقف'),
        ('closed', 'بسته'),
    )
    
    title = models.CharField(max_length=200, verbose_name='عنوان دستور کار')
    request = models.OneToOneField(MaintenanceRequest, on_delete=models.CASCADE, related_name='work_order', verbose_name='درخواست')
    technician = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='work_orders', verbose_name='تکنسین')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='open', verbose_name='وضعیت')
    start_date = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ شروع')
    end_date = models.DateTimeField(null=True, blank=True, verbose_name='تاریخ پایان')
    estimated_hours = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, verbose_name='ساعت تخمینی')
    actual_hours = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True, verbose_name='ساعت واقعی')
    notes = models.TextField(blank=True, verbose_name='یادداشت‌ها')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    
    class Meta:
        verbose_name = 'دستور کار'
        verbose_name_plural = 'دستورهای کار'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.request.asset.name}"


class SparePart(models.Model):
    """مدل قطعات یدکی"""
    
    name = models.CharField(max_length=200, verbose_name='نام قطعه')
    part_number = models.CharField(max_length=50, unique=True, verbose_name='شماره قطعه')
    quantity = models.PositiveIntegerField(default=0, verbose_name='موجودی')
    min_quantity = models.PositiveIntegerField(default=5, verbose_name='حداقل موجودی')
    unit = models.CharField(max_length=20, default='عدد', verbose_name='واحد')
    location = models.CharField(max_length=200, blank=True, verbose_name='محل ذخیره')
    supplier = models.CharField(max_length=200, blank=True, verbose_name='تامین‌کننده')
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, verbose_name='قیمت')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ایجاد')
    
    class Meta:
        verbose_name = 'قطعه یدکی'
        verbose_name_plural = 'قطعات یدکی'
        ordering = ['name']
    
    def __str__(self):
        return f"{self.name} ({self.part_number})"
    
    def is_low_stock(self):
        return self.quantity <= self.min_quantity


class MaintenanceLog(models.Model):
    """مدل گزارش تعمیرات"""
    
    work_order = models.ForeignKey(WorkOrder, on_delete=models.CASCADE, related_name='logs', verbose_name='دستور کار')
    technician = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name='تکنسین')
    action = models.CharField(max_length=200, verbose_name='اقدام انجام شده')
    parts_used = models.ManyToManyField(SparePart, blank=True, related_name='logs', verbose_name='قطعات مصرفی')
    hours_worked = models.DecimalField(max_digits=5, decimal_places=2, verbose_name='ساعات کار')
    notes = models.TextField(blank=True, verbose_name='یادداشت‌ها')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='تاریخ ثبت')
    
    class Meta:
        verbose_name = 'گزارش تعمیر'
        verbose_name_plural = 'گزارشات تعمیر'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.work_order.title} - {self.action}"
