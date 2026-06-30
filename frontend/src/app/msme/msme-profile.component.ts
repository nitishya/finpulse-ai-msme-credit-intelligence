import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-msme-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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
      <a routerLink="/msme" class="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 transition-all text-sm font-semibold">MSME Profile</a>
      <a routerLink="/health-score" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm">Health Score</a>
      <a routerLink="/loan" class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm">Loan Readiness</a>
    </nav>
  </aside>

  <main class="flex-1 ml-64 p-8 max-w-3xl">
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-white">MSME Profile</h2>
      <p class="text-slate-400 text-sm">Complete your business profile to enable AI scoring</p>
    </div>

    <div class="bg-slate-900 border border-white/5 rounded-2xl p-8">
      <form (ngSubmit)="saveProfile()">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Business Name</label>
            <input [(ngModel)]="profile.businessName" name="businessName"
              class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              placeholder="Acme Pvt. Ltd."/>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">GST Number</label>
            <input [(ngModel)]="profile.gstNumber" name="gstNumber"
              class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              placeholder="22AAAAA0000A1Z5"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Industry</label>
            <select [(ngModel)]="profile.industry" name="industry"
              class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm">
              <option value="">Select Industry</option>
              <option value="Tech">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail">Retail</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Services">Services</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Location</label>
            <input [(ngModel)]="profile.location" name="location"
              class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              placeholder="Mumbai, Maharashtra"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Annual Revenue (₹)</label>
            <input type="number" [(ngModel)]="profile.annualRevenue" name="annualRevenue"
              class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              placeholder="1250000"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Business Age (years)</label>
            <input type="number" [(ngModel)]="profile.businessAgeYears" name="businessAgeYears"
              class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              placeholder="3"/>
          </div>
        </div>

        <div class="mt-6 flex items-center gap-3">
          <button type="submit" [disabled]="saving"
            class="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/30 hover:-translate-y-0.5">
            {{ saving ? 'Saving...' : 'Save Profile' }}
          </button>
          <span *ngIf="saved" class="text-emerald-400 text-sm flex items-center gap-1">
            ✓ Profile saved successfully!
          </span>
        </div>
      </form>
    </div>

    <!-- Add Transaction -->
    <div class="bg-slate-900 border border-white/5 rounded-2xl p-8 mt-6">
      <h3 class="text-white font-semibold mb-5">Add Financial Transaction</h3>
      <form (ngSubmit)="addTransaction()">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Type</label>
            <select [(ngModel)]="tx.transactionType" name="txType"
              class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm">
              <option value="GST">GST</option>
              <option value="UPI">UPI</option>
              <option value="REVENUE">Revenue</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Amount (₹)</label>
            <input type="number" [(ngModel)]="tx.amount" name="amount"
              class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
              placeholder="50000"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-300 mb-2">Status</label>
            <select [(ngModel)]="tx.status" name="txStatus"
              class="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm">
              <option value="SUCCESS">Success</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>
        </div>
        <button type="submit" class="mt-4 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all">
          + Add Transaction
        </button>
      </form>
    </div>
  </main>
</div>
  `
})
export class MsmeProfileComponent implements OnInit {
  profile: any = { businessName: '', gstNumber: '', industry: '', location: '', annualRevenue: null, businessAgeYears: null };
  tx: any = { transactionType: 'GST', amount: null, status: 'SUCCESS' };
  saving = false;
  saved = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('/api/msme/profile').subscribe({ next: r => { if (r.data) this.profile = r.data; }, error: () => {} });
  }

  saveProfile() {
    this.saving = true;
    this.http.post<any>('/api/msme/profile', this.profile).subscribe({
      next: () => { this.saving = false; this.saved = true; setTimeout(() => this.saved = false, 3000); },
      error: () => { this.saving = false; }
    });
  }

  addTransaction() {
    this.http.post<any>('/api/finance/transaction', this.tx).subscribe({ next: () => { this.tx = { transactionType: 'GST', amount: null, status: 'SUCCESS' }; }, error: () => {} });
  }
}
