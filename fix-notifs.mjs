import fs from "fs";

const p = "src/app/notifications/page.tsx";
let c = fs.readFileSync(p, "utf-8");

// Fix 1: Skeleton section - add missing </div> for the "flex items-start" div
const old1 = `                    <div className="h-9 w-9 rounded-xl bg-muted animate-pulse" />
                    <div className="h-9 w-9 rounded-xl bg-muted animate-pulse" />
                  </div>
            </Card>`;

const new1 = `                    <div className="h-9 w-9 rounded-xl bg-muted animate-pulse" />
                    <div className="h-9 w-9 rounded-xl bg-muted animate-pulse" />
                  </div>
              </div>
            </Card>`;

c = c.replace(old1, new1);

// Fix 2: Notification item - add missing </div> for the "flex-1 min-w-0" div
const old2 = `                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{formatRelativeTime(notification.createdAt)}</span>
                              </div>
                            <div className="flex items-center gap-1 pt-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleMarkRead(notification._id)}
                                  title="Mark as read"
                                  className="rounded-xl hover:bg-indigo/10 hover:text-indigo"
                                >
                                  <CheckCheck className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(notification._id)}
                                title="Delete"
                                className="rounded-xl hover:bg-danger/10 hover:text-danger"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                      </Card>`;

const new2 = `                              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{formatRelativeTime(notification.createdAt)}</span>
                              </div>
                            <div className="flex items-center gap-1 pt-1">
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleMarkRead(notification._id)}
                                  title="Mark as read"
                                  className="rounded-xl hover:bg-indigo/10 hover:text-indigo"
                                >
                                  <CheckCheck className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(notification._id)}
                                title="Delete"
                                className="rounded-xl hover:bg-danger/10 hover:text-danger"
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                        </div>
                      </Card>`;

c = c.replace(old2, new2);

fs.writeFileSync(p, c, "utf-8");

// Verify
const opens = (c.match(/<div[^>]*>/g) || []).length;
const closes = (c.match(/<\/div>/g) || []).length;
const mOpens = (c.match(/<motion\.div[^>]*>/g) || []).length;
const mCloses = (c.match(/<\/motion\.div>/g) || []).length;
const cardOpens = (c.match(/<Card[^>]*>/g) || []).length;
const cardCloses = (c.match(/<\/Card>/g) || []).length;

console.log("div:", opens, "closes:", closes, "diff:", opens - closes);
console.log("motion.div:", mOpens, "closes:", mCloses, "diff:", mOpens - mCloses);
console.log("Card:", cardOpens, "closes:", cardCloses, "diff:", cardOpens - cardCloses);

if (opens === closes && mOpens === mCloses && cardOpens === cardCloses) {
  console.log("ALL TAGS BALANCED!");
} else {
  console.log("MISMATCHED TAGS REMAINING");
}
