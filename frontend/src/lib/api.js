// API Client for Food Truck Launch Pad
const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE;
    this.timeout = 15000;
  }

  async request(endpoint, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        signal: controller.signal,
        credentials: 'include', // Always include cookies for auth
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let message = `HTTP error ${response.status}`;
        try {
          const errData = await response.json();
          if (errData.detail) message = errData.detail;
        } catch {}
        const requestError = new Error(message);
        requestError.status = response.status;
        throw requestError;
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        throw new Error('The server took too long to respond. Please try again.');
      }
      throw error;
    }
  }

  // Status endpoints
  async getStatus() {
    return this.request('/api/status');
  }

  async createStatus(clientName) {
    return this.request('/api/status', {
      method: 'POST',
      body: JSON.stringify({ client_name: clientName }),
    });
  }

  // Truck Design endpoints
  async saveTruckDesign(design) {
    return this.request('/api/truck-designs', {
      method: 'POST',
      body: JSON.stringify(design),
    });
  }

  async getTruckDesigns() {
    return this.request('/api/truck-designs');
  }

  async getLatestTruckDesign() {
    return this.request('/api/truck-designs/latest');
  }

  // Recipe endpoints
  async saveRecipe(recipe) {
    return this.request('/api/recipes', {
      method: 'POST',
      body: JSON.stringify(recipe),
    });
  }

  async getRecipes() {
    return this.request('/api/recipes');
  }

  async getLatestRecipe() {
    return this.request('/api/recipes/latest');
  }

  // Customer Profile endpoints
  async saveCustomerProfile(profile) {
    return this.request('/api/customer-profiles', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  }

  async getLatestCustomerProfile() {
    return this.request('/api/customer-profiles/latest');
  }

  // Dish endpoints
  async saveDish(dish) {
    return this.request('/api/dishes', {
      method: 'POST',
      body: JSON.stringify(dish),
    });
  }

  async getLatestDish() {
    return this.request('/api/dishes/latest');
  }

  // Assessment endpoints
  async saveAssessment(assessment) {
    return this.request('/api/assessments', {
      method: 'POST',
      body: JSON.stringify(assessment),
    });
  }

  // Break-even endpoints
  async saveBreakEvenScenario(scenario) {
    return this.request('/api/break-even', {
      method: 'POST',
      body: JSON.stringify(scenario),
    });
  }

  async getLatestBreakEven() {
    return this.request('/api/break-even/latest');
  }

  // Permit endpoints
  async savePermit(permit) {
    return this.request('/api/permits', {
      method: 'POST',
      body: JSON.stringify(permit),
    });
  }

  async getPermits() {
    return this.request('/api/permits');
  }

  async updatePermitStatus(permitId, status) {
    return this.request(`/api/permits/${permitId}?status=${status}`, {
      method: 'PATCH',
    });
  }

  // Scaled Batch endpoints
  async saveScaledBatch(batch) {
    return this.request('/api/scaled-batches', {
      method: 'POST',
      body: JSON.stringify(batch),
    });
  }

  async getScaledBatches() {
    return this.request('/api/scaled-batches');
  }

  async getLatestScaledBatch() {
    return this.request('/api/scaled-batches/latest');
  }

  // Payroll Plan endpoints
  async savePayrollPlan(plan) {
    return this.request('/api/payroll-plans', {
      method: 'POST',
      body: JSON.stringify(plan),
    });
  }

  async getPayrollPlans() {
    return this.request('/api/payroll-plans');
  }

  async getLatestPayrollPlan() {
    return this.request('/api/payroll-plans/latest');
  }

  // Authentication endpoints
  async getCurrentUser() {
    return this.request('/api/auth/me');
  }

  async login(credentials) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async register(account) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(account),
    });
  }

  async logout() {
    return this.request('/api/auth/logout', { method: 'POST' });
  }

  // Training Progress endpoints
  async saveTrainingProgress(progress) {
    return this.request('/api/training-progress', {
      method: 'POST',
      body: JSON.stringify(progress),
    });
  }

  async getTrainingProgress() {
    return this.request('/api/training-progress');
  }

  // Training Documents
  async uploadTrainingDocument(doc) {
    return this.request('/api/training-documents', {
      method: 'POST',
      body: JSON.stringify(doc),
    });
  }

  async listTrainingDocuments() {
    return this.request('/api/training-documents');
  }

  async deleteTrainingDocument(docId) {
    return this.request(`/api/training-documents/${docId}`, {
      method: 'DELETE',
    });
  }

  // Simulation Progress endpoints
  async saveSimulationProgress(progress) {
    return this.request('/api/simulation-progress', {
      method: 'POST',
      body: JSON.stringify(progress),
    });
  }

  async getSimulationProgress() {
    return this.request('/api/simulation-progress');
  }

  // Customer Profiles
  async getCustomerProfiles() {
    return this.request('/api/customer-profiles');
  }

  // Assessments
  async getAssessments() {
    return this.request('/api/assessments');
  }

  // Subscription endpoints
  async getSubscriptionStatus() {
    return this.request('/api/subscription/status');
  }

  async startTrial(planId) {
    return this.request('/api/subscription/start-trial', {
      method: 'POST',
      body: JSON.stringify({ plan_id: planId }),
    });
  }

  async createCheckout(planId, originUrl) {
    return this.request('/api/subscription/checkout', {
      method: 'POST',
      body: JSON.stringify({ plan_id: planId, origin_url: originUrl }),
    });
  }

  async getCheckoutStatus(sessionId) {
    return this.request(`/api/subscription/checkout/status/${sessionId}`);
  }

  async cancelSubscription() {
    return this.request('/api/subscription/cancel', { method: 'POST' });
  }
}

export const apiClient = new ApiClient();
export default apiClient;
