# Admin Dashboard — BSS 1815 / PRO-MAX DMP

## Modèl wòl yo (jan ou te bati l)
- `roles/super_admins` — dokiman ki gen `users: [uid1, uid2, ...]`
- `roles/admins` — menm bagay, pou Admin òdinè
- `administrative_team/{uid}` — pwofil chak moun (non, pwojè, kazye
  li gen aksè, estati aktif)

Dashboard la itilize **fichye ofisyèl** ou yo san chanje yo:
- `js/firebase.js` — konfigirasyon Firebase (pa touche)
- `js/collections.js` — non koleksyon yo (`FIREBASE_COLLECTIONS`)
- `js/firebase-roles.js` — menm lojik `getUserRole()`/`initRoles()` ou
  te ekri a, sèlman ajiste pou l mache nan navigatè (CDN import olye
  "firebase/firestore" san URL, ki mande yon bundler)

## Siyati vizyèl la
Koulè **oranj apricot 🍊 sou fon nwa ki fade**, ak logo ofisyèl BSS la
(solèy ak flanm) anlè chak paj (`assets/logo.jpg`).

## ⚠️ Enpòtan: modil ES (import/export)
Paske `firebase.js` itilize `import`/`export`, ou **PA KA** louvri
`login.html` ak yon double-klik (`file://...`) — sa ap bloke ak erè
CORS. Ou dwe deplwaye sou **Firebase Hosting** oswa teste ak yon sèvè
lokal (`npx serve`, "Live Server" nan VS Code, elatriye).

## Deplwaye sou Firebase Hosting
1. Sou yon òdinatè ki gen Node.js: `npm install -g firebase-tools`
2. `firebase login`
3. Nan dosye pwojè a: `firebase init hosting` → chwazi pwojè
   `briyant-soley-signo-1815` → dosye piblik = `.`
4. `firebase deploy --only hosting`
5. Firebase ba ou yon lyen piblik (`briyant-soley-signo-1815.web.app`)

## Etap Firebase Console

### 1. Aktive Authentication, Firestore, Storage
Build → Authentication (Email/Password) → Enable
Build → Firestore Database → Create database
Build → Storage → Get started

### 2. Pibliye règ sekirite yo (OBLIGATWA)
- Firestore Database → Rules → kole tout `firestore.rules` → Publish
- Storage → Rules → kole tout `storage.rules` → Publish

### 3. Kreye premye Super Admin ou a (Max Louis, Cange)
1. Authentication → Users → Add user (pou chak moun), kopye UID yo
2. Firestore Database → Start collection → `roles`
3. Document ID = `super_admins`. Chan:
   - `users` (array) → mete UID Max Louis ak UID Cange
4. Kreye yon dezyèm dokiman nan menm koleksyon `roles`:
   Document ID = `admins`. Chan:
   - `users` (array) → kite l vid pou kounye a
5. Pou chak Super Admin, kreye tou yon dokiman nan koleksyon
   `administrative_team`, Document ID = UID li, ak chan:
   - `name` (string), `projects` (array — mete tout non pwojè yo),
     `categories` (array — vid, Super Admin gen aksè otomatik),
     `active` (boolean) → true

### 4. Teste
1. Louvri lyen Hosting ou a
2. Konekte ak yon kont ki nan `roles/super_admins`
3. Ale sou "Kazye Sansib", kreye yon premye kazye, telechaje yon fichye tès

## Ajoute yon Admin òdinè apati dashboard la
1. Kreye kont Auth li (Authentication → Add user), kopye UID li
2. Nan dashboard la, seksyon "Jesyon Admin yo": kole UID, non, chwazi
   "Admin", chwazi pwojè, tape kazye li gen aksè (separe ak vigil)
3. Klike "Ajoute" — sa ajoute UID li nan `roles/admins` OTOMATIKMAN
   epi kreye pwofil li nan `administrative_team`

**Pou yon Super Admin**, dashboard la sèlman kreye pwofil li —
ou dwe ajoute UID li **manyèlman** nan `roles/super_admins` nan
Firebase Console (pou rezon sekirite, sa pa fèt otomatikman).

## Sa ki poko bati
Fichye `FIREBASE_REQUIREMENTS.md` ou a mansyone plizyè lòt koleksyon
(`member_records`, `warnings`, `disciplinary_cases`, `committee_votes`,
`appeals`, `suspensions`, `audit_logs`, `governance`,
`disciplinary_committee`, `advisory_council`) ak wòl anplis
(DISCIPLINARY COMMITTEE, SPOKESPERSON, ADVISORS).

**Kounye a sa BATI**: `disciplinary.html` — sistèm konplè:
- **Manm** — Admin/Super Admin ajoute manm, bay avètisman
- **3 avètisman → Ka Disiplinè otomatik** (kreye san moun pa fè anyen anplis)
- **Vòt Komite** — manm Komite Disiplinè vote (klè / sispann / revoke)
- **Finalize desizyon** — Super Admin sèlman, apre minimòm 3 vòt
- **Sispansyon** — kreye otomatikman si desizyon an se "sispann"
- **Apèl** — Admin depoze apèl pou yon ka deside, Super Admin/Konsèy revize
- **Jounal Odit** — chak aksyon anrejistre otomatikman (Super Admin/Konsèy sèlman ka li)

Plis: `roster.html?type=musicians` / `roster.html?type=leaders` — rostè
ak foto (Admin/Super Admin jere, tout moun konekte ka wè), ak
`messages.html` — mesaj prive ant 2 moun.

## ⚠️ Konsènan "custom claims" (firebase-rules-pro-max.js)
Youn nan fichye ou te voye yo (`firebase-rules-pro-max.js`) itilize yon
**lòt sistèm wòl** ki verifye `request.auth.token.role` (custom claims)
olye lis UID nan `roles/`. Sa a **PA aktive** nan dashboard sa a paske
li mande:
1. Plan Firebase **Blaze** (peman pa itilizasyon)
2. Yon **Cloud Function** pou mete claims yo sou chak itilizatè
3. Yon **òdinatè** ak Node.js + Firebase CLI pou deplwaye fonksyon an

Sistèm aktyèl la (`roles/super_admins`, `roles/admins`) rete pwen
santral otorizasyon an. Lè ou gen aksè a yon òdinatè fonksyonèl, nou ka
migre vè custom claims san kraze sa ki deja mache a.

**Sa ki PA bati toujou**: wòl SPOKESPERSON pa gen okenn fonksyon espesyal
nan dashboard la kounye a (li se sèlman yon tit). "Branding" (koulè/logo
estoke nan Firestore olye kòd fiks) pa entegre — koulè/logo yo rete
kòdye dirèkteman nan CSS/HTML pou kounye a. Si ou bezwen youn nan sa yo,
di m sa.

## Ajoute manm Komite Disiplinè oswa Konsèy Konsiltatif
1. Kreye kont Auth li (Authentication → Add user), kopye UID li
2. Firestore Database → koleksyon `disciplinary_committee` (oswa
   `advisory_council`) → Document ID = UID li → chan:
   - `name` (string), `active` (boolean) → true
3. Moun sa a ap ka konekte epi wè seksyon "Ka Disiplinè" ak "Apèl"
   otomatikman selon wòl li.

## Ikòn Enstriman yo (fichye imaj)
Bouton filtè yo sou paj Mizisyen chèche otomatikman yon fichye ikòn pou
chak enstriman, ki dwe rele **egzakteman** konsa (nan rasin repo a):

**Enstriman BSS**: `icon-gwaj.png`, `icon-echap.png`, `icon-asyet.png`,
`icon-bass.png`, `icon-charlemagne.png`

**Tradisyonèl Rara**: `icon-banbou-vaksin.png`, `icon-banbou-bas.png`,
`icon-banbou-charlemagne.png`, `icon-kone-klewon.png`,
`icon-tanbou-manman.png`, `icon-tanbou-bas.png`, `icon-kata.png`,
`icon-kes.png`, `icon-tchatcha-maraka.png`, `icon-graj-gita.png`,
`icon-kloch-ogan.png`, `icon-senbal.png`

**Fanfa Modèn**: `icon-twonpet.png`, `icon-twonbon.png`,
`icon-saksofon-alto.png`, `icon-saksofon-teno.png`,
`icon-gwo-kes-fanfa.png`, `icon-ti-kes-snare.png`, `icon-sousafon-tuba.png`

Si yon fichye pa la, bouton an ap montre sèlman tèks — pa gen erè.

## Fichye yo
- `login.html` / `js/login.js`
- `dashboard.html` / `js/dashboard.js`
- `kazye.html` / `js/kazye.js`
- `disciplinary.html` / `js/disciplinary.js` — sistèm disiplinè konplè
- `js/disciplinary-roles.js` — verifye si UID nan Komite/Konsèy
- `roster.html` / `js/roster.js` — Mizisyen (`?type=musicians`) ak
  Dirijan (`?type=leaders`), menm paj, de koleksyon
- `messages.html` / `js/messages.js` — mesaj prive ant 2 moun
- `js/firebase.js` — konfigirasyon ofisyèl (pa touche)
- `js/firebase-roles.js` — jesyon wòl SUPER_ADMIN/ADMIN (ofisyèl)
- `js/collections.js` — non koleksyon yo (ofisyèl)
- `js/project-list.js` — lis 4 pwojè yo + Pro-Max FM
- `css/style.css` — style BSS
- `firestore.rules` / `storage.rules` — sekirite
