import fs from 'fs/promises';
import path from 'path';
import type { AllData, ProfileData, Project, Experience, TechStackItem, Achievement } from '@/types/portfolio';

const dataDirectory = path.join(process.cwd(), 'public/data');

async function loadJsonFile<T>(filename: string): Promise<T> {
  const filePath = path.join(dataDirectory, filename);
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading or parsing ${filename}:`, error);
    // Depending on strictness, you might throw error or return default/empty data
    // For this portfolio, if a file is missing, it's a critical error.
    throw new Error(`Failed to load data file: ${filename}`);
  }
}

export async function getProfileData(): Promise<ProfileData> {
  return loadJsonFile<ProfileData>('profile-data.json');
}

export async function getProjectsData(): Promise<Project[]> {
  return loadJsonFile<Project[]>('projects-data.json');
}

export async function getExperiencesData(): Promise<Experience[]> {
  return loadJsonFile<Experience[]>('experiences-data.json');
}

export async function getTechStackData(): Promise<TechStackItem[]> {
  return loadJsonFile<TechStackItem[]>('techstack-data.json');
}

export async function getAchievementsData(): Promise<Achievement[]> {
  return loadJsonFile<Achievement[]>('achievements-data.json');
}

export async function getAllPortfolioData(): Promise<AllData> {
  const [profile, projects, experiences, techStack, achievements] = await Promise.all([
    getProfileData(),
    getProjectsData(),
    getExperiencesData(),
    getTechStackData(),
    getAchievementsData(),
  ]);
  return { profile, projects, experiences, techStack, achievements };
}
