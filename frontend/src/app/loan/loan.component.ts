import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
<div class="min-h-screen bg-slate-950 flex">
  <aside class="w-64 bg-slate-900 border-r border-white/5 flex flex-col fixed h-full">
    <div class="p-6 border-b border-white/5">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
        </div>
        <h1 class="text-white font-bold text-sm">FinPulse AI</h1>
      </div>
    </div>
    <nav class="flex-1 p-4 space-y-1">
      <a routerLink="/dashboard" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm">Overview</a>
      <a routerLink="/msme" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm">MSME Profile</a>
      <a routerLink="/health-score" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm">Health Score</a>
      <a routerLink="/loan" class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 transition-all text-sm font-semibold">Loan Readiness</a>
    </nav>
  </aside>

  <main class="flex-1 ml-64 p-8">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-white">Loan Readiness</h2>
      <p class="text-slate-400 text-sm">AI-powered credit eligibility assessment</p>
    </div>

    <!-- Eligibility Banner -->
    <div [class]="'rounded-2xl p-8 mb-6 relative overflow-hidden ' + (eligible ? 'bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border border-emerald-500/20' : 'bg-gradient-to-r from-red-900/50 to-orange-900/50 border border-red-500/20')">
      <div class="flex items-center gap-4">
        <div [class]="'w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ' + (eligible ? 'bg-emerald-500/20' : 'bg-red-500/20')">
          {{ eligible ? '✅' : '⛔' }}
        </div>
        <div>
          <p [class]="'text-lg font-bold ' + (eligible ? 'text-emerald-300' : 'text-red-300')">
            {{ eligible ? 'Loan Ready!' : 'Not Yet Eligible' }}
          </p>
          <p class="text-slate-400 text-sm mt-1">
            {{ eligible ? 'Your business profile meets credit eligibility criteria. You can apply for business loans!' : 'Improve your financial health score above 65 to become loan eligible.' }}
          </p>
        </div>
      </div>
    </div>

    <!-- Loan Products -->
    <h3 class="text-white font-semibold mb-4">Available Loan Products</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      <div *ngFor="let loan of loanProducts" class="bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-blue-500/20 transition-all">
        <div class="text-2xl mb-3">{{ loan.icon }}</div>
        <h4 class="text-white font-semibold mb-1">{{ loan.name }}</h4>
        <p class="text-slate-500 text-xs mb-3">{{ loan.description }}</p>
        <div class="space-y-2">
          <div class="flex justify-between text-xs">
            <span class="text-slate-400">Max Amount</span>
            <span class="text-white font-semibold">{{ loan.maxAmount }}</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-slate-400">Interest Rate</span>
            <span class="text-emerald-400 font-semibold">{{ loan.rate }}</span>
          </div>
          <div class="flex justify-between text-xs">
            <span class="text-slate-400">Min Score</span>
            <span class="text-yellow-400 font-semibold">{{ loan.minScore }}/100</span>
          </div>
        </div>
        <button [disabled]="!eligible"
          class="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white text-xs font-semibold rounded-lg transition-all">
          {{ eligible ? 'Apply Now' : 'Ineligible' }}
        </button>
      </div>
    </div>
  </main>
</div>
  `
})
export class LoanComponent implements OnInit {
  score: any = null;
  eligible = false;

  loanProducts = [
    { icon: '🏭', name: 'Working Capital Loan', description: 'For daily operations and inventory management', maxAmount: '₹25 Lakhs', rate: '10.5% p.a.', minScore: 60 },
    { icon: '🚀', name: 'Business Expansion', description: 'Scale your business to the next level', maxAmount: '₹75 Lakhs', rate: '11.5% p.a.', minScore: 70 },
    { icon: '⚡', name: 'Emergency Credit Line', description: 'Instant credit for urgent requirements', maxAmount: '₹10 Lakhs', rate: '13% p.a.', minScore: 55 },
  ];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('/api/score/').subscribe({
      next: r => {
        this.score = r.data;
        this.eligible = (this.score?.score ?? 0) >= 65;
      },
      error: () => {}
    });
  }
}
