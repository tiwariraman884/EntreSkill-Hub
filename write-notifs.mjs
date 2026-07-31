import fs from "fs";

// Read the current corrupted file
let content = fs.readFileSync("src/app/notifications/page.tsx", "utf-8");

// Find the problematic ending and replace it with clean JSX
const marker = "groupNotifications(notifications) : [[\"Unread\" as TimeGroup, notifications.filter((n) => !n.read)]];";

const idx = content.indexOf(marker);
if (idx === -1) {
  console.error("Could not find marker");
  process.exit(1);
}

const start = content.substring(0, idx + marker.length) + "\n\n  return (\n";
const rest = content.substring(idx + marker.length);
const returnIdx = rest.indexOf("return (");
if (returnIdx !== -1) {
  // There's already a return statement, use just the JSX portion after it
}

const cleanJSX = `    <div className="container mx-auto px-4 py-8 sm:py-12 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1.5 text-sm sm:text-base">
            {unreadCount > 0 ? "You have " + unreadCount + " unread notification" + (unreadCount === 1 ? "" : "s") : "You are all caught up"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="ghost" size="sm" onClick={fetchNotifications} className="rounded-xl" aria-label="Refresh notifications">
            <RefreshCw className="h-4 w-4" />
          </Button>
          {(["all", "unread"] as const).map((f) => (
            <Button key={f} variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)} size="sm" className="rounded-xl">
              {f === "all" ? "All" : "Unread"}
            </Button>
          ))}
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllRead} className="rounded-xl text-indigo hover:text-indigo hover:bg-indigo/5">
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark all read
            </Button>
          )}
        </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} size="default">
              <div className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-24 rounded-full bg-muted animate-pulse" />
                      <div className="h-4 w-20 rounded-full bg-muted/70 animate-pulse" />
                    </div>
                    <div className="h-4 w-full rounded-lg bg-muted animate-pulse" />
                    <div className="h-4 w-2/3 rounded-lg bg-muted/70 animate-pulse" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-9 w-9 rounded-xl bg-muted animate-pulse" />
                    <div className="h-9 w-9 rounded-xl bg-muted animate-pulse" />
                  </div>
              </div>
            </Card>
          ))}
        </div>
      ) : notifications.length === 0 ? (
        <EmptyState icon="search" title="No notifications" description="You are all caught up - we will let you know when something arrives." />
      ) : (
        <motion.div key={filter} className="space-y-6" layout variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06, when: "beforeChildren" } } }} initial="hidden" animate="visible">
          {groupedNotifs.map(([group, items]) => (
            <div key={group}>
              <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1">{group}</h2>
              <div className="space-y-3">
                {items.map((notification) => {
                  const badgeVariant = TYPE_VARIANTS[notification.type] || "outline";
                  const badgeLabel = TYPE_LABELS[notification.type] || notification.type;
                  return (
                    <motion.div key={notification._id} variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } }}>
                      <Card hoverable glow={!notification.read} className={cn(!notification.read && "bg-indigo/[0.02]")}>
                        <div className="p-4 sm:p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0 space-y-2.5">
                              <div className="flex flex-wrap items-center gap-2">
                                <Badge variant={badgeVariant} className="capitalize rounded-full">{badgeLabel}</Badge>
                                {!notification.read && <span className="inline-flex h-2 w-2 rounded-full bg-indigo shadow-[0_0_0_3px_rgba(79,70,229,0.15)]" />}
                              </div>
                              <p className={notification.read ? "text-sm sm:text-base leading-relaxed text-muted-foreground" : "text-sm sm:text-base leading-relaxed text-foreground font-medium"}>{notification.message}</p>
                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{formatRelativeTime(notification.createdAt)}</span>
                              </div>
                            <div className="flex items-center gap-1 pt-1">
                              {!notification.read && (
                                <Button variant="ghost" size="icon" onClick={() => handleMarkRead(notification._id)} title="Mark as read" className="rounded-xl hover:bg-indigo/10 hover:text-indigo">
                                  <CheckCheck className="h-4 w-4" />
                                </Button>
                              )}
                              <Button variant="ghost" size="icon" onClick={() => handleDelete(notification._id)} title="Delete" className="rounded-xl hover:bg-danger/10 hover:text-danger">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
`;

// Find the last return of the file (the JSX return) and replace everything after it
const lastReturn = content.lastIndexOf(`  return (`);
if (lastReturn === -1) {
  console.error("Could not find return statement");
  process.exit(1);
}

const newContent = content.substring(0, lastReturn) + cleanJSX;
fs.writeFileSync("src/app/notifications/page.tsx", newContent, "utf-8");
console.log("Fixed successfully. Length:", newContent.length);
