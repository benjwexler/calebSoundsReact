class TransactionMailer < ApplicationMailer
    def transaction_email(email)
        @email = email
        mail(to: @email, subject: 'Transaction Email')
      end
end
