export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      booking_passengers: {
        Row: {
          booking_id: string
          created_at: string | null
          id: string
          passenger_age: number | null
          passenger_gender: string | null
          passenger_name: string
          seat_number: number
        }
        Insert: {
          booking_id: string
          created_at?: string | null
          id?: string
          passenger_age?: number | null
          passenger_gender?: string | null
          passenger_name: string
          seat_number: number
        }
        Update: {
          booking_id?: string
          created_at?: string | null
          id?: string
          passenger_age?: number | null
          passenger_gender?: string | null
          passenger_name?: string
          seat_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "booking_passengers_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      bookings: {
        Row: {
          booking_reference: string
          booking_status: string | null
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at: string | null
          id: string
          payment_status: string | null
          schedule_id: string
          selected_seats: number[]
          total_amount: number
          travel_date: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          booking_reference: string
          booking_status?: string | null
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at?: string | null
          id?: string
          payment_status?: string | null
          schedule_id: string
          selected_seats: number[]
          total_amount: number
          travel_date: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          booking_reference?: string
          booking_status?: string | null
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          created_at?: string | null
          id?: string
          payment_status?: string | null
          schedule_id?: string
          selected_seats?: number[]
          total_amount?: number
          travel_date?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_schedule_id_fkey"
            columns: ["schedule_id"]
            isOneToOne: false
            referencedRelation: "schedules"
            referencedColumns: ["id"]
          },
        ]
      }
      buses: {
        Row: {
          amenities: string[] | null
          bus_number: string
          bus_type: string
          created_at: string | null
          id: string
          seat_layout: Json
          status: string | null
          total_seats: number
          vendor_id: string
        }
        Insert: {
          amenities?: string[] | null
          bus_number: string
          bus_type: string
          created_at?: string | null
          id?: string
          seat_layout: Json
          status?: string | null
          total_seats: number
          vendor_id: string
        }
        Update: {
          amenities?: string[] | null
          bus_number?: string
          bus_type?: string
          created_at?: string | null
          id?: string
          seat_layout?: Json
          status?: string | null
          total_seats?: number
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "buses_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      package_availability: {
        Row: {
          available_slots: number
          created_at: string | null
          end_date: string
          id: string
          package_id: string
          price_override: number | null
          start_date: string
        }
        Insert: {
          available_slots: number
          created_at?: string | null
          end_date: string
          id?: string
          package_id: string
          price_override?: number | null
          start_date: string
        }
        Update: {
          available_slots?: number
          created_at?: string | null
          end_date?: string
          id?: string
          package_id?: string
          price_override?: number | null
          start_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "package_availability_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      package_bookings: {
        Row: {
          availability_id: string
          booking_reference: string
          booking_status: string | null
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at: string | null
          id: string
          number_of_people: number
          package_id: string
          payment_status: string | null
          special_requests: string | null
          total_amount: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          availability_id: string
          booking_reference: string
          booking_status?: string | null
          contact_email: string
          contact_name: string
          contact_phone: string
          created_at?: string | null
          id?: string
          number_of_people: number
          package_id: string
          payment_status?: string | null
          special_requests?: string | null
          total_amount: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          availability_id?: string
          booking_reference?: string
          booking_status?: string | null
          contact_email?: string
          contact_name?: string
          contact_phone?: string
          created_at?: string | null
          id?: string
          number_of_people?: number
          package_id?: string
          payment_status?: string | null
          special_requests?: string | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "package_bookings_availability_id_fkey"
            columns: ["availability_id"]
            isOneToOne: false
            referencedRelation: "package_availability"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "package_bookings_package_id_fkey"
            columns: ["package_id"]
            isOneToOne: false
            referencedRelation: "packages"
            referencedColumns: ["id"]
          },
        ]
      }
      packages: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          duration_days: number
          excludes: string[] | null
          highlights: string[] | null
          id: string
          images: string[] | null
          includes: string[] | null
          itinerary: Json | null
          max_group_size: number | null
          price: number
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration_days: number
          excludes?: string[] | null
          highlights?: string[] | null
          id?: string
          images?: string[] | null
          includes?: string[] | null
          itinerary?: Json | null
          max_group_size?: number | null
          price: number
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration_days?: number
          excludes?: string[] | null
          highlights?: string[] | null
          id?: string
          images?: string[] | null
          includes?: string[] | null
          itinerary?: Json | null
          max_group_size?: number | null
          price?: number
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          currency: string | null
          gateway_response: Json | null
          id: string
          payment_gateway_id: string | null
          payment_method: string
          status: string | null
          transaction_date: string | null
        }
        Insert: {
          amount: number
          booking_id: string
          currency?: string | null
          gateway_response?: Json | null
          id?: string
          payment_gateway_id?: string | null
          payment_method: string
          status?: string | null
          transaction_date?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string
          currency?: string | null
          gateway_response?: Json | null
          id?: string
          payment_gateway_id?: string | null
          payment_method?: string
          status?: string | null
          transaction_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          phone: string | null
          role: Database["public"]["Enums"]["app_role"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["app_role"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      promotions: {
        Row: {
          applicable_to: string
          code: string
          created_at: string | null
          description: string | null
          discount_type: string
          discount_value: number
          id: string
          max_discount: number | null
          min_amount: number | null
          status: string | null
          title: string
          usage_limit: number | null
          used_count: number | null
          valid_from: string
          valid_until: string
        }
        Insert: {
          applicable_to: string
          code: string
          created_at?: string | null
          description?: string | null
          discount_type: string
          discount_value: number
          id?: string
          max_discount?: number | null
          min_amount?: number | null
          status?: string | null
          title: string
          usage_limit?: number | null
          used_count?: number | null
          valid_from: string
          valid_until: string
        }
        Update: {
          applicable_to?: string
          code?: string
          created_at?: string | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          id?: string
          max_discount?: number | null
          min_amount?: number | null
          status?: string | null
          title?: string
          usage_limit?: number | null
          used_count?: number | null
          valid_from?: string
          valid_until?: string
        }
        Relationships: []
      }
      routes: {
        Row: {
          created_at: string | null
          distance_km: number | null
          estimated_duration_hours: number | null
          from_city: string
          id: string
          to_city: string
        }
        Insert: {
          created_at?: string | null
          distance_km?: number | null
          estimated_duration_hours?: number | null
          from_city: string
          id?: string
          to_city: string
        }
        Update: {
          created_at?: string | null
          distance_km?: number | null
          estimated_duration_hours?: number | null
          from_city?: string
          id?: string
          to_city?: string
        }
        Relationships: []
      }
      schedules: {
        Row: {
          arrival_time: string
          available_dates: string[]
          base_price: number
          bus_id: string
          created_at: string | null
          departure_time: string
          id: string
          route_id: string
          status: string | null
        }
        Insert: {
          arrival_time: string
          available_dates: string[]
          base_price: number
          bus_id: string
          created_at?: string | null
          departure_time: string
          id?: string
          route_id: string
          status?: string | null
        }
        Update: {
          arrival_time?: string
          available_dates?: string[]
          base_price?: number
          bus_id?: string
          created_at?: string | null
          departure_time?: string
          id?: string
          route_id?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "schedules_bus_id_fkey"
            columns: ["bus_id"]
            isOneToOne: false
            referencedRelation: "buses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "schedules_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          id: string
          license_number: string | null
          name: string
          status: string | null
        }
        Insert: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          license_number?: string | null
          name: string
          status?: string | null
        }
        Update: {
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          license_number?: string | null
          name?: string
          status?: string | null
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
      app_role: "admin" | "operator" | "customer"
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
      app_role: ["admin", "operator", "customer"],
    },
  },
} as const
