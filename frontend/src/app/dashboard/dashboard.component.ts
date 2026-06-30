import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<div class="min-h-screen bg-slate-950 flex">
  <!-- Sidebar -->
  <aside class="w-64 bg-slate-900 border-r border-white/5 flex flex-col fixed h-full z-10">
    <div class="p-6 border-b border-white/5">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <div>
          <h1 class="text-white font-bold text-sm leading-tight">FinPulse AI</h1>
          <p class="text-slate-500 text-xs">MSME Intelligence</p>
        </div>
      </div>
    </div>

    <nav class="flex-1 p-4 space-y-1">
      <a routerLink="/dashboard" routerLinkActive="bg-blue-600/20 text-blue-400 border-blue-500/30" [routerLinkActiveOptions]="{exact:true}"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-transparent transition-all text-sm font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/></svg>
        Overview
      </a>
      <a routerLink="/msme"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-transparent transition-all text-sm font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
        MSME Profile
      </a>
      <a routerLink="/health-score"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-transparent transition-all text-sm font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Health Score
      </a>
      <a routerLink="/loan"
        class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-transparent transition-all text-sm font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Loan Readiness
      </a>
    </nav>

    <div class="p-4 border-t border-white/5">
      <button (click)="logout()"
        class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all text-sm font-medium">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
        Logout
      </button>
    </div>
  </aside>

  <!-- Main Content -->
  <main class="flex-1 ml-64 p-8">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-white">Good morning! 👋</h2>
        <p class="text-slate-400 text-sm">Here's your financial intelligence overview</p>
      </div>
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-blue-600/20 border border-blue-500/30 rounded-xl flex items-center justify-center">
          <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
        </div>
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      <div *ngFor="let stat of stats" class="bg-slate-900 border border-white/5 rounded-2xl p-5 hover:border-blue-500/20 transition-all group">
        <div class="flex items-center justify-between mb-3">
          <div [class]="'w-10 h-10 rounded-xl flex items-center justify-center ' + stat.iconBg">
            <span [innerHTML]="stat.icon" class="text-lg"></span>
          </div>
          <span [class]="'text-xs font-semibold px-2 py-1 rounded-full ' + stat.badgeClass">{{ stat.badge }}</span>
        </div>
        <p class="text-2xl font-bold text-white mb-1">{{ stat.value }}</p>
        <p class="text-slate-500 text-xs">{{ stat.label }}</p>
      </div>
    </div>

    <!-- Health Score Banner & Recent Activity -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
      <!-- AI Health Score Card -->
      <div class="col-span-1 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 relative overflow-hidden">
        <div class="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
        <p class="text-blue-100 text-sm font-medium mb-1 relative">AI Credit Health Score</p>
        <div class="flex items-end gap-2 mb-3 relative">
          <span class="text-6xl font-bold text-white">{{ score?.score ?? '--' }}</span>
          <span class="text-blue-200 text-lg mb-2">/100</span>
        </div>
        <div class="relative">
          <div class="h-2 bg-white/20 rounded-full mb-3">
            <div [style.width.%]="score?.score ?? 0" class="h-2 bg-white rounded-full transition-all duration-1000"></div>
          </div>
          <span [class]="getRiskBadge()" class="inline-block text-xs font-bold px-3 py-1 rounded-full">{{ score?.riskCategory ?? 'UNSCORED' }}</span>
        </div>
        <a routerLink="/health-score" class="mt-4 inline-flex items-center gap-1 text-blue-100 text-xs hover:text-white transition-colors relative">
          View full analysis →
        </a>
      </div>

      <!-- Recent Transactions -->
      <div class="col-span-2 bg-slate-900 border border-white/5 rounded-2xl p-6">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-white font-semibold">Recent Transactions</h3>
          <span class="text-slate-500 text-xs">Last 5 entries</span>
        </div>
        <div *ngIf="transactions.length === 0" class="text-center py-8">
          <p class="text-slate-500 text-sm">No transactions yet. Add financial data to get started.</p>
        </div>
        <div class="space-y-3" *ngIf="transactions.length > 0">
          <div *ngFor="let tx of transactions.slice(0,5)" class="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
            <div class="flex items-center gap-3">
              <div [class]="'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ' + (tx.transactionType === 'GST' ? 'bg-purple-500/20 text-purple-400' : 'bg-green-500/20 text-green-400')">
                {{ tx.transactionType?.charAt(0) }}
              </div>
              <div>
                <p class="text-white text-sm font-medium">{{ tx.transactionType }} Transaction</p>
                <p class="text-slate-500 text-xs">{{ tx.transactionDate | date:'dd MMM, HH:mm' }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-white text-sm font-semibold">₹{{ tx.amount | number:'1.0-0' }}</p>
              <p [class]="'text-xs ' + (tx.status === 'SUCCESS' ? 'text-green-400' : 'text-yellow-400')">{{ tx.status }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <a routerLink="/msme" class="bg-slate-900 border border-white/5 hover:border-blue-500/30 rounded-2xl p-5 flex items-center gap-4 transition-all group hover:-translate-y-0.5">
        <div class="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
          <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
        </div>
        <div>
          <p class="text-white text-sm font-semibold">Update Profile</p>
          <p class="text-slate-500 text-xs">Business information</p>
        </div>
      </a>
      <a routerLink="/health-score" class="bg-slate-900 border border-white/5 hover:border-indigo-500/30 rounded-2xl p-5 flex items-center gap-4 transition-all group hover:-translate-y-0.5">
        <div class="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center group-hover:bg-indigo-500/20 transition-all">
          <svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div>
          <p class="text-white text-sm font-semibold">Generate AI Score</p>
          <p class="text-slate-500 text-xs">Credit health analysis</p>
        </div>
      </a>
      <a routerLink="/loan" class="bg-slate-900 border border-white/5 hover:border-emerald-500/30 rounded-2xl p-5 flex items-center gap-4 transition-all group hover:-translate-y-0.5">
        <div class="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
          <svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <div>
          <p class="text-white text-sm font-semibold">Check Loan Eligibility</p>
          <p class="text-slate-500 text-xs">AI-based readiness</p>
        </div>
      </a>
    </div>
  </main>
</div>
  `
})
export class DashboardComponent implements OnInit {
  score: any = null;
  transactions: any[] = [];

  stats = [
    { value: '₹12.5L', label: 'Annual Revenue', badge: '+18%', badgeClass: 'bg-green-500/10 text-green-400', iconBg: 'bg-green-500/10', icon: '📈' },
    { value: '3 yrs', label: 'Business Age', badge: 'Established', badgeClass: 'bg-blue-500/10 text-blue-400', iconBg: 'bg-blue-500/10', icon: '🏢' },
    { value: '142', label: 'Transactions', badge: 'This month', badgeClass: 'bg-purple-500/10 text-purple-400', iconBg: 'bg-purple-500/10', icon: '💳' },
    { value: '98%', label: 'Payment On-Time', badge: 'Excellent', badgeClass: 'bg-emerald-500/10 text-emerald-400', iconBg: 'bg-emerald-500/10', icon: '✅' },
  ];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<any>('/api/score/').subscribe({ next: r => this.score = r.data, error: () => {} });
    this.http.get<any>('/api/finance/transactions').subscribe({ next: r => this.transactions = r.data || [], error: () => {} });
  }

  getRiskBadge(): string {
    const r = this.score?.riskCategory;
    if (r === 'LOW') return 'bg-green-500/20 text-green-300';
    if (r === 'MEDIUM') return 'bg-yellow-500/20 text-yellow-300';
    return 'bg-red-500/20 text-red-300';
  }

  logout() {
    localStorage.removeItem('fp_token');
    this.router.navigate(['/login']);
  }
}
