export interface Certificate {
  id: string
  url: string
  title: { en: string; id: string }
  issuer: string
  date: { en: string; id: string }
  credentialId: string
  description: { en: string; id: string }
  tags: string[]
}

export const certificates: Certificate[] = [
  {
    id: 'kodam-pkl',
    url: '/images/certificates/kodam-pkl.jpg',
    title: {
      en: 'Field Work Internship — Infolahtadam IV/Diponegoro',
      id: 'Praktik Kerja Lapangan — Infolahtadam IV/Diponegoro',
    },
    issuer: 'KODAM IV/Diponegoro',
    date: {
      en: 'Feb 21, 2025',
      id: '21 Februari 2025',
    },
    credentialId: 'No. 01 / II / 2025',
    description: {
      en: 'Completed a one-month Field Work Internship at Information and Data Processing (Infolahtadam IV/Diponegoro) from January 20 to February 21, 2025 with a "Memuaskan" (Satisfactory) evaluation.',
      id: 'Menyelesaikan Praktik Kerja Lapangan di Bagian Informasi dan Pengolahan Data (Infolahtadam IV/Diponegoro) pada 20 Januari s.d. 21 Februari 2025 dengan hasil "Memuaskan".',
    },
    tags: ['Internship', 'Data Processing', 'Information Systems', 'Memuaskan'],
  },
  {
    id: 'junior-cybersecurity-analyst',
    url: '/images/certificates/junior-cybersecurity-analyst.png',
    title: {
      en: 'Junior Cybersecurity Analyst Career Path',
      id: 'Junior Cybersecurity Analyst Career Path',
    },
    issuer: 'Cisco Networking Academy · UNISBANK',
    date: {
      en: 'Aug 25, 2026',
      id: '25 Agustus 2026',
    },
    credentialId: 'b9013b4e-77b0-496f-8f58-d566c63f7487',
    description: {
      en: 'Awarded for successfully completing the Junior Cybersecurity Analyst Career Path Exam offered by Universitas Stikubank (UNISBANK) through the Cisco Networking Academy program.',
      id: 'Berhasil menyelesaikan ujian jalur karier Junior Cybersecurity Analyst yang diselenggarakan oleh Universitas Stikubank (UNISBANK) melalui program Cisco Networking Academy.',
    },
    tags: ['Cybersecurity', 'Cisco NetAcad', 'Threat Analysis', 'Security Operations'],
  },
  {
    id: 'ccna-intro-networks',
    url: '/images/certificates/ccna-intro-networks.png',
    title: {
      en: 'CCNA: Introduction to Networks',
      id: 'CCNA: Introduction to Networks',
    },
    issuer: 'Cisco Networking Academy · UNISBANK',
    date: {
      en: 'Sep 01, 2026',
      id: '01 September 2026',
    },
    credentialId: 'ddaa3369-470c-434f-9d91-e6cc4669a144',
    description: {
      en: 'Awarded for successfully completing CCNA: Introduction to Networks offered by Universitas Stikubank (UNISBANK) through the Cisco Networking Academy program.',
      id: 'Menyelesaikan sertifikasi CCNA: Introduction to Networks dari Universitas Stikubank (UNISBANK) melalui program Cisco Networking Academy.',
    },
    tags: ['Networking', 'CCNA', 'IP Routing', 'Cisco'],
  },
  {
    id: 'englishscore-b1',
    url: '/images/certificates/englishscore-b1.png',
    title: {
      en: 'EnglishScore Core Skills — CEFR B1',
      id: 'EnglishScore Core Skills — CEFR B1',
    },
    issuer: 'British Council · UNISBANK',
    date: {
      en: 'Aug 24, 2026',
      id: '24 Agustus 2026',
    },
    credentialId: '06b45176fcd1',
    description: {
      en: 'Achieved CEFR B1 (Intermediate) in the British Council EnglishScore Core Skills test with an overall score of 381 (Grammar 347, Vocabulary 445, Reading 341, Listening 390).',
      id: 'Meraih tingkat CEFR B1 (Intermediate) pada tes British Council EnglishScore Core Skills dengan skor 381 (Grammar 347, Vocabulary 445, Reading 341, Listening 390).',
    },
    tags: ['British Council', 'CEFR B1', 'Score 381', 'English Proficiency'],
  },
]
