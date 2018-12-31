require "application_system_test_case"

class SoundAndKitsTest < ApplicationSystemTestCase
  setup do
    @sound_and_kit = sound_and_kits(:one)
  end

  test "visiting the index" do
    visit sound_and_kits_url
    assert_selector "h1", text: "Sound And Kits"
  end

  test "creating a Sound and kit" do
    visit sound_and_kits_url
    click_on "New Sound And Kit"

    fill_in "Kit", with: @sound_and_kit.kit_id
    fill_in "Sound", with: @sound_and_kit.sound_id
    click_on "Create Sound and kit"

    assert_text "Sound and kit was successfully created"
    click_on "Back"
  end

  test "updating a Sound and kit" do
    visit sound_and_kits_url
    click_on "Edit", match: :first

    fill_in "Kit", with: @sound_and_kit.kit_id
    fill_in "Sound", with: @sound_and_kit.sound_id
    click_on "Update Sound and kit"

    assert_text "Sound and kit was successfully updated"
    click_on "Back"
  end

  test "destroying a Sound and kit" do
    visit sound_and_kits_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Sound and kit was successfully destroyed"
  end
end
