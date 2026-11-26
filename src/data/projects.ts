export type ProjectStatus = 'completed' | 'in-development' | 'experimental'

export interface ProjectResult {
  label: string
  value: string
}

export interface Project {
  id: string
  title: string
  category: string
  description: { en: string; id: string }
  tech: string[]
  status: ProjectStatus
  highlight?: { en: string; id: string }
  results?: ProjectResult[]
  githubUrl: string | null
  thumbnailUrl: string
}

export const projects: Project[] = [
  {
    id: 'satusehat-sentiment',
    title: 'SATUSEHAT Mobile Sentiment Analysis',
    category: 'MACHINE LEARNING / ACADEMIC RESEARCH',
    description: {
      en: 'A comparative study analyzing user sentiment from SATUSEHAT Mobile application reviews using Support Vector Machine, Logistic Regression, and K-Nearest Neighbor algorithms.',
      id: 'Penelitian komparatif untuk menganalisis sentimen ulasan pengguna aplikasi SATUSEHAT Mobile menggunakan algoritma Support Vector Machine, Logistic Regression, dan K-Nearest Neighbor.',
    },
    tech: ['Python', 'Google Colab', 'Pandas', 'Scikit-learn', 'TF-IDF', 'Sastrawi'],
    status: 'completed',
    results: [
      { label: 'SVM', value: '90.74%' },
      { label: 'Logistic Regression', value: '90.05%' },
      { label: 'KNN', value: '88.34%' },
    ],
    highlight: {
      en: 'Support Vector Machine achieved the highest classification accuracy among the three evaluated algorithms.',
      id: 'Support Vector Machine mencapai akurasi klasifikasi tertinggi di antara tiga algoritma yang dievaluasi.',
    },
    githubUrl: null,
    thumbnailUrl: '/images/projects/satusehat.svg',
  },
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio Website',
    category: 'WEB DEVELOPMENT / UI DESIGN',
    description: {
      en: 'A personal portfolio website designed to communicate professional identity, showcase technical interests, and present projects through a modern digital experience.',
      id: 'Website portofolio pribadi yang dirancang untuk mengkomunikasikan identitas profesional, menampilkan minat teknis, dan menyajikan proyek melalui pengalaman digital modern.',
    },
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    status: 'in-development',
    githubUrl: null,
    thumbnailUrl: '/images/projects/portfolio.svg',
  },
  {
    id: 'ai-data-exploration',
    title: 'AI & Data Exploration',
    category: 'ARTIFICIAL INTELLIGENCE / DATA ANALYTICS',
    description: {
      en: 'A collection of experimental projects focused on Python programming, Artificial Intelligence fundamentals, machine learning workflows, and data processing systems.',
      id: 'Kumpulan eksperimen pembelajaran yang berfokus pada pemrograman Python, dasar Artificial Intelligence, alur machine learning, dan sistem pemrosesan data.',
    },
    tech: ['Python', 'Google Colab', 'Pandas', 'NumPy'],
    status: 'experimental',
    githubUrl: null,
    thumbnailUrl: '/images/projects/ai-exploration.svg',
  },
]
