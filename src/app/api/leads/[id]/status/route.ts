import { type NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { db } from '~/server/db';

const updateStatusSchema = z.object({
  status: z.enum(['PENDING', 'REACHED_OUT']),
});

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const leadId = parseInt(id);

    if (isNaN(leadId)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid lead ID',
        },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = updateStatusSchema.parse(body);

    // Check if lead exists
    const existingLead = await db.lead.findUnique({
      where: { id: leadId },
    });

    if (!existingLead) {
      return NextResponse.json(
        {
          success: false,
          error: 'Lead not found',
        },
        { status: 404 }
      );
    }

    // Update lead status
    const updatedLead = await db.lead.update({
      where: { id: leadId },
      data: {
        status: validatedData.status,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        id: updatedLead.id,
        status: updatedLead.status,
        message: 'Lead status updated successfully',
      },
    });
  } catch (error) {
    console.error('Error updating lead status:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid status value',
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