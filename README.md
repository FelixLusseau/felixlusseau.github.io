# Site Vitrine - Félix Lusseau

Site vitrine personnel présentant mon profil, mes compétences et mes projets.

## 🚀 Déploiement sur GitHub Pages

Ce site est conçu pour être déployé sur GitHub Pages. Voici les étapes :

### 1. Créer un repository GitHub
- Créez un nouveau repository sur GitHub
- Nommez-le `[votre-nom].github.io` pour un site principal ou tout autre nom pour un site de projet

### 2. Pousser le code
```bash
git init
git add .
git commit -m "Initial commit - Site vitrine"
git branch -M main
git remote add origin https://github.com/FelixLusseau/[nom-du-repo].git
git push -u origin main
```

### 3. Activer GitHub Pages
- Allez dans les paramètres du repository
- Section "Pages"
- Source : "Deploy from a branch"
- Branch : `main` / `/ (root)`
- Sauvegardez

### 4. Accéder au site
Votre site sera disponible à l'adresse :
- Pour un repository `username.github.io` : `https://username.github.io`
- Pour un autre repository : `https://username.github.io/nom-du-repo`

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique moderne
- **CSS3** : Design responsive avec Flexbox/Grid, animations CSS
- **JavaScript (Vanilla)** : Interactions dynamiques, animations
- **Font Awesome** : Icônes
- **Google Fonts (Inter)** : Typographie moderne

## ✨ Fonctionnalités

- **Design responsive** : Optimisé pour tous les écrans
- **Navigation fluide** : Scroll doux et navigation collante
- **Animations** : Effets de hover, transitions, parallax
- **Performance** : Optimisé pour le chargement rapide
- **Accessibilité** : Navigation au clavier, contraste optimal
- **SEO friendly** : Structure HTML sémantique

## 🎨 Personnalisation

### Couleurs
Les couleurs principales sont définies dans les variables CSS dans `styles.css` :
```css
:root {
    --primary-color: #3b82f6;
    --secondary-color: #64748b;
    --accent-color: #f59e0b;
    /* ... */
}
```

### Contenu
Modifiez le contenu dans `index.html` :
- Informations personnelles
- Compétences
- Projets
- Liens sociaux

### Projets
Ajoutez vos projets dans la section `#projects` en suivant la structure existante.

## 📱 Responsive Design

Le site s'adapte automatiquement aux différentes tailles d'écran :
- **Desktop** : Layout en grille, navigation horizontale
- **Tablet** : Adaptation des colonnes
- **Mobile** : Menu hamburger, layout vertical

## 🚀 Performance

- **Images optimisées** : Lazy loading
- **CSS/JS minifiés** : Pour la production
- **Fonts préchargées** : Amélioration du temps de chargement
- **Animations optimisées** : GPU acceleration

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser et de le modifier.

## 👨‍💻 Auteur

**Félix Lusseau**
- GitHub: [@FelixLusseau](https://github.com/FelixLusseau)
- LinkedIn: [felix-lusseau](https://www.linkedin.com/in/felix-lusseau)

---

Fait avec ❤️ et déployé sur GitHub Pages
