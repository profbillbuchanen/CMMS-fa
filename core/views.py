from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from .models import Asset, MaintenanceRequest, WorkOrder, SparePart
from jalali_date import date2jalali


def dashboard(request):
    """نمایش داشبورد اصلی"""
    # آمار کلی
    total_assets = Asset.objects.count()
    pending_requests = MaintenanceRequest.objects.filter(status='pending').count()
    in_progress_orders = WorkOrder.objects.filter(status='in_progress').count()
    low_stock_parts = SparePart.objects.filter(quantity__lte=10).count()
    
    # وضعیت تجهیزات
    active_assets = Asset.objects.filter(status='active').count()
    maintenance_assets = Asset.objects.filter(status='maintenance').count()
    broken_assets = Asset.objects.filter(status='broken').count()
    inactive_assets = Asset.objects.filter(status='inactive').count()
    
    # آخرین درخواست‌ها
    recent_requests = MaintenanceRequest.objects.select_related('asset').order_by('-created_at')[:5]
    
    context = {
        'total_assets': total_assets,
        'pending_requests': pending_requests,
        'in_progress_orders': in_progress_orders,
        'low_stock_parts': low_stock_parts,
        'active_assets': active_assets,
        'maintenance_assets': maintenance_assets,
        'broken_assets': broken_assets,
        'inactive_assets': inactive_assets,
        'recent_requests': recent_requests,
    }
    
    return render(request, 'core/dashboard.html', context)


@login_required
def asset_list(request):
    """لیست تجهیزات"""
    assets = Asset.objects.all()
    
    # فیلترها
    status = request.GET.get('status')
    category = request.GET.get('category')
    search = request.GET.get('search')
    
    if status:
        assets = assets.filter(status=status)
    if category:
        assets = assets.filter(category__icontains=category)
    if search:
        assets = assets.filter(
            models.Q(name__icontains=search) | 
            models.Q(code__icontains=search) |
            models.Q(description__icontains=search)
        )
    
    context = {
        'assets': assets,
        'statuses': Asset.STATUS_CHOICES,
    }
    
    return render(request, 'core/asset_list.html', context)


@login_required
def request_list(request):
    """لیست درخواست‌های تعمیر"""
    requests = MaintenanceRequest.objects.select_related('asset', 'requester').all()
    
    # فیلترها
    status = request.GET.get('status')
    priority = request.GET.get('priority')
    
    if status:
        requests = requests.filter(status=status)
    if priority:
        requests = requests.filter(priority=priority)
    
    context = {
        'requests': requests,
        'statuses': MaintenanceRequest.STATUS_CHOICES,
        'priorities': MaintenanceRequest.PRIORITY_CHOICES,
    }
    
    return render(request, 'core/request_list.html', context)


@login_required
def request_detail(request, pk):
    """جزئیات درخواست تعمیر"""
    req = get_object_or_404(MaintenanceRequest.objects.select_related('asset', 'requester'), pk=pk)
    
    context = {
        'request_obj': req,
    }
    
    return render(request, 'core/request_detail.html', context)


@login_required
def work_order_list(request):
    """لیست دستورهای کار"""
    work_orders = WorkOrder.objects.select_related('request', 'technician').all()
    
    status = request.GET.get('status')
    if status:
        work_orders = work_orders.filter(status=status)
    
    context = {
        'work_orders': work_orders,
        'statuses': WorkOrder.STATUS_CHOICES,
    }
    
    return render(request, 'core/work_order_list.html', context)


@login_required
def spare_part_list(request):
    """لیست قطعات یدکی"""
    parts = SparePart.objects.all()
    
    search = request.GET.get('search')
    if search:
        parts = parts.filter(
            models.Q(name__icontains=search) | 
            models.Q(part_number__icontains=search)
        )
    
    context = {
        'parts': parts,
    }
    
    return render(request, 'core/spare_part_list.html', context)
