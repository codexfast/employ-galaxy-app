export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      applications: {
        Row: {
          applied_at: string
          candidate_id: string
          cover_letter: string | null
          id: string
          job_id: string
          status: Database["public"]["Enums"]["application_status"] | null
          updated_at: string
        }
        Insert: {
          applied_at?: string
          candidate_id: string
          cover_letter?: string | null
          id?: string
          job_id: string
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string
        }
        Update: {
          applied_at?: string
          candidate_id?: string
          cover_letter?: string | null
          id?: string
          job_id?: string
          status?: Database["public"]["Enums"]["application_status"] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidate_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      candidate_profiles: {
        Row: {
          address: string | null
          ancestry: string | null
          bio: string | null
          birth_date: string | null
          created_at: string
          full_name: string | null
          id: string
          is_profile_complete: boolean | null
          languages: string[] | null
          nationality: string | null
          phone: string | null
          resume_url: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          ancestry?: string | null
          bio?: string | null
          birth_date?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_profile_complete?: boolean | null
          languages?: string[] | null
          nationality?: string | null
          phone?: string | null
          resume_url?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          ancestry?: string | null
          bio?: string | null
          birth_date?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_profile_complete?: boolean | null
          languages?: string[] | null
          nationality?: string | null
          phone?: string | null
          resume_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "candidate_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      company_profiles: {
        Row: {
          address: string | null
          cnpj: string | null
          company_name: string | null
          created_at: string
          description: string | null
          employee_count: number | null
          founded_year: number | null
          id: string
          is_profile_complete: boolean | null
          is_verified: boolean | null
          logo_url: string | null
          phone: string | null
          responsible_name: string | null
          sector: Database["public"]["Enums"]["sector_type"] | null
          subscription_active: boolean | null
          subscription_expires_at: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          address?: string | null
          cnpj?: string | null
          company_name?: string | null
          created_at?: string
          description?: string | null
          employee_count?: number | null
          founded_year?: number | null
          id: string
          is_profile_complete?: boolean | null
          is_verified?: boolean | null
          logo_url?: string | null
          phone?: string | null
          responsible_name?: string | null
          sector?: Database["public"]["Enums"]["sector_type"] | null
          subscription_active?: boolean | null
          subscription_expires_at?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          address?: string | null
          cnpj?: string | null
          company_name?: string | null
          created_at?: string
          description?: string | null
          employee_count?: number | null
          founded_year?: number | null
          id?: string
          is_profile_complete?: boolean | null
          is_verified?: boolean | null
          logo_url?: string | null
          phone?: string | null
          responsible_name?: string | null
          sector?: Database["public"]["Enums"]["sector_type"] | null
          subscription_active?: boolean | null
          subscription_expires_at?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company_id: string
          created_at: string
          description: string
          id: string
          is_active: boolean | null
          job_type: Database["public"]["Enums"]["job_type"]
          location: string
          requirements: string | null
          salary_max: number | null
          salary_min: number | null
          sector: Database["public"]["Enums"]["sector_type"]
          title: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          description: string
          id?: string
          is_active?: boolean | null
          job_type: Database["public"]["Enums"]["job_type"]
          location: string
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          sector: Database["public"]["Enums"]["sector_type"]
          title: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          description?: string
          id?: string
          is_active?: boolean | null
          job_type?: Database["public"]["Enums"]["job_type"]
          location?: string
          requirements?: string | null
          salary_max?: number | null
          salary_min?: number | null
          sector?: Database["public"]["Enums"]["sector_type"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "jobs_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "company_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          updated_at?: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      application_status: "pending" | "accepted" | "rejected" | "withdrawn"
      job_type:
        | "full_time"
        | "part_time"
        | "contract"
        | "internship"
        | "freelance"
      sector_type:
        | "IT"
        | "retail"
        | "construction"
        | "manufacturing"
        | "services"
        | "education"
        | "healthcare"
        | "tourism"
        | "food"
        | "logistics"
        | "other"
      user_type: "candidate" | "company"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      application_status: ["pending", "accepted", "rejected", "withdrawn"],
      job_type: [
        "full_time",
        "part_time",
        "contract",
        "internship",
        "freelance",
      ],
      sector_type: [
        "IT",
        "retail",
        "construction",
        "manufacturing",
        "services",
        "education",
        "healthcare",
        "tourism",
        "food",
        "logistics",
        "other",
      ],
      user_type: ["candidate", "company"],
    },
  },
} as const
