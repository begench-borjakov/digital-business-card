import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

async function main(): Promise<void> {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL is not configured');
  }

  const prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString,
    }),
  });

  try {
    await prisma.experience.deleteMany();
    await prisma.project.deleteMany();
    await prisma.skill.deleteMany();
    await prisma.profile.deleteMany();

    const profile = await prisma.profile.create({
      data: {
        name: 'Begench Borjakov',
        title: 'Backend Developer',
        about:
          'Backend Developer with commercial experience building server-side applications, APIs and third-party integrations using Node.js, NestJS, TypeScript, PostgreSQL and MongoDB.',
        email: 'begenchborjakov0@gmail.com',
        phone: '+90 537 524 52 64',
        telegram: '@Begench_Borjakov',
        githubUrl: 'https://github.com/begench-borjakov',
        linkedinUrl:
          'https://linkedin.com/in/begench-borjakov-862b84395',
        location: null,
      },
    });

    await prisma.skill.createMany({
      data: [
        {
          name: 'TypeScript',
          category: 'Programming',
          profileId: profile.id,
        },
        {
          name: 'JavaScript',
          category: 'Programming',
          profileId: profile.id,
        },
        {
          name: 'C',
          category: 'Programming',
          profileId: profile.id,
        },
        {
          name: 'C++',
          category: 'Programming',
          profileId: profile.id,
        },
        {
          name: 'Node.js',
          category: 'Backend',
          profileId: profile.id,
        },
        {
          name: 'NestJS',
          category: 'Backend',
          profileId: profile.id,
        },
        {
          name: 'Express.js',
          category: 'Backend',
          profileId: profile.id,
        },
        {
          name: 'REST API',
          category: 'Backend',
          profileId: profile.id,
        },
        {
          name: 'GraphQL',
          category: 'Backend',
          profileId: profile.id,
        },
        {
          name: 'PostgreSQL',
          category: 'Databases',
          profileId: profile.id,
        },
        {
          name: 'MySQL',
          category: 'Databases',
          profileId: profile.id,
        },
        {
          name: 'MongoDB',
          category: 'Databases',
          profileId: profile.id,
        },
        {
          name: 'Redis',
          category: 'Databases',
          profileId: profile.id,
        },
        {
          name: 'Prisma',
          category: 'ORM',
          profileId: profile.id,
        },
        {
          name: 'Mongoose',
          category: 'ORM',
          profileId: profile.id,
        },
        {
          name: 'JWT',
          category: 'Security',
          profileId: profile.id,
        },
        {
          name: 'RBAC',
          category: 'Security',
          profileId: profile.id,
        },
        {
          name: 'Guards',
          category: 'Security',
          profileId: profile.id,
        },
        {
          name: 'Validation',
          category: 'Security',
          profileId: profile.id,
        },
        {
          name: 'Rate Limiting',
          category: 'Security',
          profileId: profile.id,
        },
        {
          name: 'Bitrix24',
          category: 'Integrations',
          profileId: profile.id,
        },
        {
          name: 'External REST APIs',
          category: 'Integrations',
          profileId: profile.id,
        },
        {
          name: 'AI Integrations',
          category: 'Integrations',
          profileId: profile.id,
        },
        {
          name: 'Axios',
          category: 'Integrations',
          profileId: profile.id,
        },
        {
          name: 'Jest',
          category: 'Testing',
          profileId: profile.id,
        },
        {
          name: 'Docker',
          category: 'Tools',
          profileId: profile.id,
        },
        {
          name: 'Git',
          category: 'Tools',
          profileId: profile.id,
        },
        {
          name: 'GitHub',
          category: 'Tools',
          profileId: profile.id,
        },
        {
          name: 'GitLab',
          category: 'Tools',
          profileId: profile.id,
        },
        {
          name: 'Swagger',
          category: 'Documentation',
          profileId: profile.id,
        },
        {
          name: 'OpenAPI',
          category: 'Documentation',
          profileId: profile.id,
        },
        {
          name: 'OOP',
          category: 'Concepts',
          profileId: profile.id,
        },
        {
          name: 'Repository Pattern',
          category: 'Concepts',
          profileId: profile.id,
        },
        {
          name: 'Layered Architecture',
          category: 'Concepts',
          profileId: profile.id,
        },
        {
          name: 'Transactions',
          category: 'Concepts',
          profileId: profile.id,
        },
        {
          name: 'Soft Delete',
          category: 'Concepts',
          profileId: profile.id,
        },
        {
          name: 'CMS',
          category: 'Other',
          profileId: profile.id,
        },
        {
          name: 'CRM',
          category: 'Other',
          profileId: profile.id,
        },
      ],
    });

    await prisma.project.createMany({
      data: [
        {
          name: 'Notification Preferences Service',
          description:
            'Backend service that evaluates whether notifications can be sent based on user preferences, global policies, quiet hours, region and time.',
          technologies:
            'TypeScript, Node.js, NestJS, PostgreSQL, Prisma, Jest',
          githubUrl:
            'https://github.com/begench-borjakov/notification-preferences-service',
          demoUrl: null,
          profileId: profile.id,
        },
        {
          name: 'Booking API',
          description:
            'Booking backend with JWT authentication, event and user CRUD, protection against duplicate bookings and repository-based data access.',
          technologies:
            'NestJS, TypeScript, PostgreSQL, Prisma, JWT, Swagger',
          githubUrl: 'https://github.com/begench-borjakov/booking-api',
          demoUrl: null,
          profileId: profile.id,
        },
        {
          name: 'Auth Service',
          description:
            'Authentication and user management backend with access and refresh tokens, RBAC, guards, user and role management.',
          technologies: 'NestJS, TypeScript, MongoDB, JWT, Swagger',
          githubUrl: 'https://github.com/begench-borjakov/auth-service',
          demoUrl: null,
          profileId: profile.id,
        },
        {
          name: 'URL Checker',
          description:
            'Fullstack application for processing URL-checking jobs in the background with progress tracking, cancellation, timeouts and controlled concurrency.',
          technologies:
            'NestJS, TypeScript, React, Vite, Zustand, Docker',
          githubUrl: 'https://github.com/begench-borjakov/url-checker',
          demoUrl: null,
          profileId: profile.id,
        },
      ],
    });

    await prisma.experience.createMany({
      data: [
        {
          company: 'RiseStaff',
          role: 'Backend Developer',
          employmentType: 'Project-based',
          startDate: '05/2026',
          endDate: null,
          current: true,
          description:
            'Developed and maintained backend features for an HR SaaS platform using NestJS, TypeScript, PostgreSQL and Prisma.',
          highlights: [
            'Authentication and authorization',
            'RBAC',
            'Backend business logic',
            'REST API development',
            'Database operations',
            'Bitrix24 integrations',
            'AI-related backend functionality',
          ],
          technologies: [
            'NestJS',
            'TypeScript',
            'PostgreSQL',
            'Prisma',
            'Docker',
            'REST API',
            'Bitrix24',
          ],
          profileId: profile.id,
        },
        {
          company: 'Innovatica Systems',
          role: 'Backend Developer',
          employmentType: null,
          startDate: '02/2026',
          endDate: '05/2026',
          current: false,
          description:
            'Built a backend leads module for a corporate website using NestJS and TypeScript.',
          highlights: [
            'Request and DTO validation',
            'Anti-spam protection',
            'Rate limiting',
            'Email notifications',
            'Logging',
            'PostgreSQL persistence',
            'Prisma integration',
            'CMS configuration/integration',
          ],
          technologies: [
            'NestJS',
            'TypeScript',
            'PostgreSQL',
            'Prisma',
            'Docker',
            'CMS',
          ],
          profileId: profile.id,
        },
        {
          company: 'Evercode Lab',
          role: 'Backend Developer Intern',
          employmentType: null,
          startDate: '08/2025',
          endDate: '10/2025',
          current: false,
          description: 'Developed a TypeScript SDK for the Ontology blockchain.',
          highlights: [
            'Key generation',
            'Address generation',
            'Transaction building',
            'Transaction signing',
            'Transaction broadcasting',
            'Integration with public Ontology APIs',
            'Transaction polling',
            'Jest testing',
          ],
          technologies: [
            'Node.js',
            'TypeScript',
            'Axios',
            'elliptic',
            'bs58',
            'big.js',
            'Jest',
          ],
          profileId: profile.id,
        },
        {
          company: 'Altyn-hyzmat',
          role: 'Junior Backend Developer',
          employmentType: null,
          startDate: '01/2025',
          endDate: '07/2025',
          current: false,
          description: 'Developed REST API endpoints using Node.js and Express.js.',
          highlights: [
            'Server-side business logic',
            'Request validation',
            'MongoDB queries',
            'Mongoose schemas and models',
          ],
          technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose'],
          profileId: profile.id,
        },
      ],
    });

    console.log('Database seeded successfully');
  } finally {
    await prisma.$disconnect();
  }
}

void main();
