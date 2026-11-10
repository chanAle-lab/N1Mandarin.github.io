/* Saves "known" word ticks in the browser so they survive a page reload.
   Optional: the site works without this file (ticks then last for one visit). */
window.N1Store = {
  load() { try { JSON.parse(localStorage.getItem("n1m-known") || "[]").forEach((n) => this.known.add(n)); } catch (e) {} },
  save() { try { localStorage.setItem("n1m-known", JSON.stringify([...this.known])); } catch (e) {} }
};
