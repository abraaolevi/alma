import type { Prisma } from '@prisma/client';
import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createLeadSchema,
  leadQuerySchema,
  leadResponseSchema,
} from '~/schemas';
import { db } from '~/server/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = createLeadSchema.parse(body);

    // Create lead in database
    const lead = await db.lead.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        country: validatedData.country,
        websiteUrl: validatedData.websiteUrl,
        resumeUrl: validatedData.resumeUrl,
        moreInfo: validatedData.moreInfo,
        status: 'PENDING',
      },
    });

    // Create lead-visa relationships
    if (validatedData.visaTypes.length > 0) {
      // Get visa IDs
      const visas = await db.visa.findMany({
        where: {
          name: {
            in: validatedData.visaTypes,
          },
        },
      });

      // Create relationships
      await db.leadVisa.createMany({
        data: visas.map((visa) => ({
          leadId: lead.id,
          visaId: visa.id,
        })),
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: lead.id,
          message: 'Lead created successfully',
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating lead:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Validate query parameters
    const queryParams = leadQuerySchema.parse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      status: searchParams.get('status'),
      search: searchParams.get('search'),
    });

    const { page, limit, status, search } = queryParams;
    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.LeadWhereInput = {};

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { email: { contains: search } },
      ];
    }

    // Get leads with visa relationships
    const leads = await db.lead.findMany({
      where,
      include: {
        LeadVisa: {
          include: {
            visa: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take: limit,
    });

    // Get total count for pagination
    const total = await db.lead.count({ where });

    // Transform data with proper type validation
    const transformedLeads = leads.map((lead) => {
      // Map visa types - Zod will validate the types
      const visaTypes = lead.LeadVisa.map((lv) => lv.visa.name);

      // Zod will validate and ensure type safety
      return leadResponseSchema.parse({
        id: lead.id,
        firstName: lead.firstName,
        lastName: lead.lastName,
        email: lead.email,
        country: lead.country,
        websiteUrl: lead.websiteUrl,
        resumeUrl: lead.resumeUrl,
        moreInfo: lead.moreInfo,
        status: lead.status,
        visaTypes,
        createdAt: lead.createdAt,
        updatedAt: lead.updatedAt,
      });
    });

    return NextResponse.json({
      success: true,
      data: {
        leads: transformedLeads,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error('Error fetching leads:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
      },
      { status: 500 }
    );
  }
}
