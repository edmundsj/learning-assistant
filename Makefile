.PHONY: api
api:
	npx supabase gen types typescript --project-id "${SUPABASE_PROJECT_ID}" --schema public > src/models/supabase.ts


