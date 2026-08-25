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
        githubUrl: 'https://github.com/begench-borjakov',
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

    console.log('Database seeded successfully');
  } finally {
    await prisma.$disconnect();
  }
}

void main();
