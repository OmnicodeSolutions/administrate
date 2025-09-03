module Features
  def have_flash(text, options = {})
    options.reverse_merge!(type: :notice)
    have_css("div[data-controller='flash']", text: text)
  end
end
