class AddStreamingLinksForTracks < ActiveRecord::Migration[5.2]
  def change
    add_column :tracks, :spotify_url, :string
    add_column :tracks, :soundcloud_url, :string
    add_column :tracks, :apple_music_url, :string
    add_column :tracks, :youtube_url, :string
  end
end
