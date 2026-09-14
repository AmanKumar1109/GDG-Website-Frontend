#!/bin/bash
cat << 'PATCH_EOF' > hook.patch
--- src/features/Event/hook/usefetchEventDetaill.ts
+++ src/features/Event/hook/usefetchEventDetaill.ts
@@ -10,7 +10,13 @@
       try {
         const response = await api.get(\`/api/v1/event/\${slug}\`);
         if (response.data?.data?.[0]) {
-          return response.data.data[0];
+          const apiEvent = response.data.data[0];
+          return {
+            ...apiEvent,
+            mentors: apiEvent.mentors?.length ? apiEvent.mentors : singleEventData.mentors,
+            judges: apiEvent.judges?.length ? apiEvent.judges : singleEventData.judges,
+            rules: apiEvent.rules?.length ? apiEvent.rules : singleEventData.rules,
+          };
         }
       } catch {
         console.warn(\`[GDG Ranchi] Failed to fetch live event for \${slug}, using fallback.\`);
@@ -29,6 +35,8 @@
             ? found.requirements
             : singleEventData.requirements,
           timeline: found.timeline?.length ? found.timeline : singleEventData.timeline,
+          mentors: found.mentors?.length ? found.mentors : singleEventData.mentors,
+          judges: found.judges?.length ? found.judges : singleEventData.judges,
         };
       }
 
PATCH_EOF
patch src/features/Event/hook/usefetchEventDetaill.ts < hook.patch
