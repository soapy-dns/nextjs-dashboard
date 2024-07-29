## Next.js App Router Course - Starter with supabase

## for aggregation to work

will need to run this

```
ALTER ROLE authenticator SET pgrst.db_aggregates_enabled = 'true';
NOTIFY pgrst, 'reload config';
```

or you will get the error msg 'Use of aggregate functions is not allowed'.

Can also set an upper limit for statement cost
https://supabase.com/blog/postgrest-aggregate-functions#summing-up

## find out what is running on port 3000

lsof -i :3000

kill -9 pid

## supabase connection pool

https://github.com/orgs/supabase/discussions/21264

## supabase branching

https://www.youtube.com/watch?v=N0Wb85m3YMI
