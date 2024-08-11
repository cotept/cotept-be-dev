-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MENTEE', 'MENTOR');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('GOOGLE', 'KAKAO', 'LOCAL');

-- CreateEnum
CREATE TYPE "BaekjoonTier" AS ENUM ('Unrated', 'Bronze_5', 'Bronze_4', 'Bronze_3', 'Bronze_2', 'Bronze_1', 'Silver_5', 'Silver_4', 'Silver_3', 'Silver_2', 'Silver_1', 'Gold_5', 'Gold_4', 'Gold_3', 'Gold_2', 'Gold_1', 'Platinum_5', 'Platinum_4', 'Platinum_3', 'Platinum_2', 'Platinum_1', 'Diamond_5', 'Diamond_4', 'Diamond_3', 'Diamond_2', 'Diamond_1', 'Ruby_5', 'Ruby_4', 'Ruby_3', 'Ruby_2', 'Ruby_1', 'Master');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "providerId" TEXT,
    "provider" "Provider",
    "refreshToken" TEXT,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "email" TEXT NOT NULL,
    "baekjoonId" TEXT,
    "baekjoonTier" "BaekjoonTier",

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_providerId_key" ON "User"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_userId_key" ON "UserProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_username_key" ON "UserProfile"("username");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_email_key" ON "UserProfile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_baekjoonId_key" ON "UserProfile"("baekjoonId");

-- AddForeignKey
ALTER TABLE "UserProfile" ADD CONSTRAINT "UserProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
