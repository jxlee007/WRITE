// Types for Shadow Protocol data structures
export interface Evidence {
    title: string;
    description: string;
    tags: string[];
}

export interface Outcome {
    status: string;
    statusDescription: string;
    details: string[];
}

export interface Connection {
    caseId: string;
    title: string;
    connection: string;
}

export interface CaseContent {
    quote: string;
    missionSummary: string[];
    evidence: Evidence[];
    outcome: Outcome;
    connections: Connection[];
}

export interface Case {
    id: string;
    slug: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
    year: string;
    content: CaseContent;
}

export interface Character {
    id: string;
    name: string;
    role: string;
    image?: string;
    icon: string;
    face: string[];
    profile: {
        bio: string;
        specialties: string[];
        years: string;
        operations: string;
        countries: string;
        classification: string;
        timeline: Array<{
            year: string;
            title: string;
            desc: string;
        }>;
    };
}

export interface Film {
    id: string;
    number: string;
    title: string;
    tagline: string;
    image: string;
    year: string;
}

export interface TimelineEvent {
    id: string;
    year: string;
    title: string;
    description: string;
    tags: string[];
    relatedCaseId: string | null;
    characters: string[];
}