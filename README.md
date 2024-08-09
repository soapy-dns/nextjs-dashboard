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

## Auth

https://www.youtube.com/watch?v=w2h54xz6Ndw

https://authjs.dev/getting-started - v5 official docs

https://www.youtube.com/watch?v=DJvM2lSPn6w - semi-official v5

v5, but could be better
https://www.youtube.com/watch?v=4BjowsolXmw

https://www.youtube.com/watch?v=w2h54xz6Ndw - Dave Gray - v4 (has augmented modules) doesn't have custom

https://www.youtube.com/watch?v=ay-atEUGIc4 - Dave Gray, but v4

- Good https://www.youtube.com/watch?v=bMYZSi_LZ2w
