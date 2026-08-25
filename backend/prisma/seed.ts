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
          category: 'Languages',
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
          name: 'PostgreSQL',
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
          name: 'GraphQL',
          category: 'Backend',
          profileId: profile.id,
        },
        {
          name: 'Jest',
          category: 'Testing',
          profileId: profile.id,
        },
      ],
    });

    await prisma.project.createMany({
      data: [
        {
          name: 'RiseStaff HR SaaS Backend',
          description:
            'Backend development for an HR SaaS platform including authentication, RBAC, business logic, database operations, Bitrix24 integrations and AI-related backend functionality.',
          technologies:
            'NestJS, TypeScript, PostgreSQL, Prisma, Docker, REST API, Bitrix24',
          githubUrl: null,
          demoUrl: null,
          profileId: profile.id,
        },
        {
          name: 'Corporate Leads Backend Module',
          description:
            'Backend leads module with validation, anti-spam protection, rate limiting, email notifications, logging and PostgreSQL persistence.',
          technologies: 'NestJS, TypeScript, PostgreSQL, Prisma, Docker, CMS',
          githubUrl: null,
          demoUrl: null,
          profileId: profile.id,
        },
        {
          name: 'Ontology TypeScript SDK',
          description:
            'TypeScript SDK for the Ontology blockchain with key and address generation, transaction building, signing, broadcasting, API integration and automated testing.',
          technologies:
            'Node.js, TypeScript, Axios, elliptic, bs58, big.js, Jest',
          githubUrl: null,
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
