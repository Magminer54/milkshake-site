(() => {
  const KEY_CART = 'milkshakeCart';
  const KEY_LAST = 'lastMilkshake';
  const $ = (id) => document.getElementById(id);

  const safeJson = (raw, fallback) => {
    try {
      const v = raw == null ? fallback : JSON.parse(raw);
      return v;
    } catch {
      return fallback;
    }
  };

  window.CartSystem = {
    KEY_CART,
    KEY_LAST,

    getCart() {
      const raw = localStorage.getItem(KEY_CART);
      const parsed = safeJson(raw, []);
      return Array.isArray(parsed) ? parsed : [];
    },

    setCart(cart) {
      localStorage.setItem(KEY_CART, JSON.stringify(Array.isArray(cart) ? cart : []));
    },

    addMilkshake(milkshake) {
      if (!milkshake) return;
      const cart = this.getCart();
      cart.push(milkshake);
      this.setCart(cart);
    },

    removeAt(index) {
      const cart = this.getCart();
      cart.splice(index, 1);
      this.setCart(cart);
    },

    clear() {
      this.setCart([]);
    },

    getLastMilkshake() {
      const raw = localStorage.getItem(KEY_LAST);
      return safeJson(raw, null);
    },

    setLastMilkshake(milkshake) {
      localStorage.setItem(KEY_LAST, JSON.stringify(milkshake));
    },

    updateBadge(badgeEl) {
      if (!badgeEl) return;
      const cart = this.getCart();
      badgeEl.textContent = String(cart.length);
    }
  };
})();

