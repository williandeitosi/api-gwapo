-- CreateTable
CREATE TABLE "adminToken" (
    "id" SERIAL NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "adminId" INTEGER,

    CONSTRAINT "adminToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "adminToken_accessToken_key" ON "adminToken"("accessToken");

-- CreateIndex
CREATE UNIQUE INDEX "adminToken_refreshToken_key" ON "adminToken"("refreshToken");

-- AddForeignKey
ALTER TABLE "adminToken" ADD CONSTRAINT "adminToken_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE CASCADE ON UPDATE CASCADE;
