require 'zip'

class TransactionMailer < ApplicationMailer
    def transaction_email(email, kit_id)
        @kit = Kit.find(kit_id)
        @filename = "CEG-Soundpack-Vol1.zip"
        t = Tempfile.new(@filename)
        compressed_filestream = Zip::ZipOutputStream.write_buffer do |zos|
            @kit.sounds.each_with_index do |sound, i|
                if i <=12
              zos.put_next_entry(sound.soundfile.filename)
              zos.write(sound.soundfile.blob.download)
                end 
            end
          end

        compressed_filestream.rewind
        
        # attachments[filename] = compressed_filestream.read

        attachments[@filename] = {mime_type: 'application/gzip',
                                    content: compressed_filestream.read}

        @email = email
        mail(to: @email, subject: 'Transaction Email')
      end
end
