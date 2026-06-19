// Supabase Configuration
const SUPABASE_CONFIG = {
  url: 'https://dixparntguicqukyrkyz.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpeHBhcm50Z3VpY3F1a3lya3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4MTg4OTEsImV4cCI6MjA5NzM5NDg5MX0.FePmSzeRkdGvUtPTFfvK6ZApo3THTQlVs6pMzbWPpmw',
  storageBucket: 'product-images'
};

// Lazy initialization - créer le client seulement quand on en a besoin
// IMPORTANT: ne PAS l'appeler "supabase", car "var supabase" au scope global
// EST window.supabase (même propriété). Or window.supabase contient déjà
// la librairie ({ createClient }) chargée via le script type="module" dans
// admin.html. Si on réutilise ce nom, ce script et le nôtre s'écrasent
// mutuellement et getSupabaseClient() finit par retourner la librairie au
// lieu du client → d'où l'erreur "client.from is not a function".
var supabaseClientInstance = null;

function getSupabaseClient() {
  console.log('getSupabaseClient appelé, instance actuelle:', supabaseClientInstance);
  
  if (supabaseClientInstance === null) {
    console.log('Création du client Supabase...');
    console.log('window.supabase existe?', typeof window.supabase !== 'undefined');
    
    if (typeof window.supabase === 'undefined') {
      console.error('window.supabase est undefined!');
      throw new Error('La librairie Supabase n\'est pas chargée');
    }
    
    console.log('window.supabase.createClient existe?', typeof window.supabase.createClient === 'function');
    
    if (typeof window.supabase.createClient !== 'function') {
      console.error('window.supabase.createClient n\'est pas une fonction!');
      console.error('window.supabase:', window.supabase);
      throw new Error('window.supabase.createClient n\'est pas disponible');
    }
    
    try {
      supabaseClientInstance = window.supabase.createClient(
        SUPABASE_CONFIG.url,
        SUPABASE_CONFIG.anonKey
      );
      console.log('Supabase client créé avec succès:', supabaseClientInstance);
      console.log('supabaseClientInstance.from existe?', typeof supabaseClientInstance.from === 'function');
    } catch (error) {
      console.error('Erreur lors de la création du client:', error);
      throw error;
    }
  }
  
  if (supabaseClientInstance === null) {
    console.error('Le client est toujours null après création!');
    throw new Error('Impossible de créer le client Supabase');
  }
  
  return supabaseClientInstance;
}

// Initialisation au chargement du DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM chargé, vérification Supabase...');
    console.log('window.supabase:', typeof window.supabase !== 'undefined' ? window.supabase : 'undefined');
  });
} else {
  console.log('DOM déjà chargé, vérification Supabase...');
  console.log('window.supabase:', typeof window.supabase !== 'undefined' ? window.supabase : 'undefined');
}