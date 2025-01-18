-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "voter_id" TEXT NOT NULL,
    "feedback_id" TEXT NOT NULL,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_voter_id_fkey" FOREIGN KEY ("voter_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vote" ADD CONSTRAINT "Vote_feedback_id_fkey" FOREIGN KEY ("feedback_id") REFERENCES "Feedback"("id") ON DELETE CASCADE ON UPDATE CASCADE;
