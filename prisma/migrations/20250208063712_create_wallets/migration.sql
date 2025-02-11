-- CreateTable
CREATE TABLE "Wallets" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT,
    "address" TEXT,
    "check_extension" BOOLEAN,
    "check_application" BOOLEAN,

    CONSTRAINT "Wallets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Wallets" ADD CONSTRAINT "Wallets_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
